import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
  Grid,
  Avatar,
  Snackbar,
  Alert,
} from '@mui/material';
import useGlobalData from '@/hooks/get-global';

export interface CustomerFormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  host_name: string;
  bio: string;
  logo?: File;
  avatar?: File;
  city: string;
  location: string;
  address: string;
  services: string[];
  image?: File;
}

interface DynamicFormProps {
  mode: 'add' | 'edit';
  initialData?: CustomerFormData;
  onSubmit: (data: CustomerFormData | FormData) => void | Promise<void>;
}

const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
const maxFileSize = 5 * 1024 * 1024; // 5MB

const DynamicForm: React.FC<DynamicFormProps> = ({
  mode,
  initialData,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<CustomerFormData>({
    name: initialData?.name || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    password: initialData?.password || '',
    host_name: initialData?.host_name || '',
    bio: initialData?.bio || '',
    logo: undefined,
    avatar: undefined,
    city: initialData?.city || '',
    location: initialData?.location || '',
    address: initialData?.address || '',
    services: initialData?.services || [],
    image: undefined,
  });

  const [alert, setAlert] = useState<{ open: boolean; message: string; severity: 'error' | 'success' }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, checked } = event.target;
    if (checked) {
      setFormData((prevData) => ({
        ...prevData,
        services: [...prevData.services, name],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        services: prevData.services.filter((service) => service !== name),
      }));
    }
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: 'logo' | 'avatar' | 'image'
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!allowedTypes.includes(file.type)) {
        setAlert({
          open: true,
          message: 'Please select an image of type JPEG or PNG.',
          severity: 'error',
        });
        return;
      }
      if (file.size > maxFileSize) {
        setAlert({
          open: true,
          message: 'File size must be less than 5MB!',
          severity: 'error',
        });
        return;
      }
      setFormData((prevData) => ({ ...prevData, [field]: file }));
    }
  };

  type ServiceType = { id: string; type: string };
  type ServiceDataResponse = { data: ServiceType[] };

  const { data: serviceData } = useGlobalData<ServiceDataResponse>({
    dataSourceName: `api/service_types`,
  });

  const handleSubmit = () => {
    // تحقق من الحقول المطلوبة
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.password ||
      !formData.logo ||
      !formData.avatar ||
      !formData.image
    ) {
      setAlert({
        open: true,
        message: 'All fields and images are required.',
        severity: 'error',
      });
      return;
    }
    // تحقق من نوع الصور
    if (
      !allowedTypes.includes(formData.logo.type) ||
      !allowedTypes.includes(formData.avatar.type) ||
      !allowedTypes.includes(formData.image.type)
    ) {
      setAlert({
        open: true,
        message: 'Logo, Avatar, and Image must be jpeg, jpg, or png.',
        severity: 'error',
      });
      return;
    }
    // تحقق من حجم الصور
    if (
      formData.logo.size > maxFileSize ||
      formData.avatar.size > maxFileSize ||
      formData.image.size > maxFileSize
    ) {
      setAlert({
        open: true,
        message: 'Image size must be less than 5MB.',
        severity: 'error',
      });
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('host_name', formData.host_name);
    formDataToSend.append('bio', formData.bio);
    formDataToSend.append('city', formData.city);
    formDataToSend.append('location', formData.location);
    formDataToSend.append('address', formData.address);

    formDataToSend.append('logo', formData.logo);
    formDataToSend.append('avatar', formData.avatar);
    formDataToSend.append('image', formData.image);

    formData.services.forEach((serviceId, idx) => {
      formDataToSend.append(`services[${idx}]`, serviceId);
    });

    onSubmit(formDataToSend);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={() => setAlert((a) => ({ ...a, open: false }))}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setAlert((a) => ({ ...a, open: false }))}
          severity={alert.severity}
          sx={{ width: '100%' }}
        >
          {alert.message}
        </Alert>
      </Snackbar>

      {/* Images */}
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Box>
          <Typography variant="caption">Logo</Typography>
          <Avatar
            alt="Logo"
            src={formData.logo ? URL.createObjectURL(formData.logo) : undefined}
            sx={{ width: 56, height: 56, mb: 1 }}
          />
          <Button variant="outlined" component="label" size="small">
            Choose Logo
            <input type="file" accept="image/jpeg,image/png,image/jpg" hidden onChange={e => handleFileChange(e, 'logo')} />
          </Button>
        </Box>
        <Box>
          <Typography variant="caption">Avatar</Typography>
          <Avatar
            alt="Avatar"
            src={formData.avatar ? URL.createObjectURL(formData.avatar) : undefined}
            sx={{ width: 56, height: 56, mb: 1 }}
          />
          <Button variant="outlined" component="label" size="small">
            Choose Avatar
            <input type="file" accept="image/jpeg,image/png,image/jpg" hidden onChange={e => handleFileChange(e, 'avatar')} />
          </Button>
        </Box>
        <Box>
          <Typography variant="caption">Image</Typography>
          <Avatar
            alt="Image"
            src={formData.image ? URL.createObjectURL(formData.image) : undefined}
            sx={{ width: 56, height: 56, mb: 1 }}
          />
          <Button variant="outlined" component="label" size="small">
            Choose Image
            <input type="file" accept="image/jpeg,image/png,image/jpg" hidden onChange={e => handleFileChange(e, 'image')} />
          </Button>
        </Box>
      </Box>

      {/* Text Fields */}
      <Grid container spacing={2}>
        <Grid size={6}>
          <TextField
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            fullWidth
            required
          />
        </Grid>
        <Grid size={6}>
          <TextField
            label="Host Name"
            name="host_name"
            value={formData.host_name}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid size={6}>
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            fullWidth
            required
          />
        </Grid>
        <Grid size={6}>
          <TextField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            fullWidth
            required
          />
        </Grid>
        <Grid size={6}>
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            fullWidth
            required={mode === 'add'}
          />
        </Grid>
        <Grid size={6}>
          <TextField
            label="City"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid size={6}>
          <TextField
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid size={6}>
          <TextField
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid size={12}>
          <TextField
            label="Bio"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            fullWidth
            multiline
            rows={2}
          />
        </Grid>
      </Grid>

      {/* Services */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Service Types</Typography>
        <Grid container spacing={2}>
          {serviceData?.data?.map((service: any) => (
            <Grid size={4} key={service.id}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.services.includes(service.id)}
                    onChange={handleCheckboxChange}
                    name={service.id}
                  />
                }
                label={service.type}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Save Button */}
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ px: 4 }}
        >
          Save Changes
        </Button>
      </Box>
    </Box>
  );
};

export default DynamicForm;