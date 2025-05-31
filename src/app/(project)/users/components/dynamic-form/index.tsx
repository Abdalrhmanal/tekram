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
} from '@mui/material';
import useGlobalData from '@/hooks/get-global';

export interface FormData {
  full_name: string;
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
  initialData?: FormData;
  onSubmit: (data: FormData) => void;
}

const DynamicForm: React.FC<DynamicFormProps> = ({
  mode,
  initialData,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<FormData>({
    full_name: initialData?.full_name || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    password: initialData?.password || '',
    host_name: initialData?.host_name || '',
    bio: initialData?.bio || '',
    logo: initialData?.logo,
    avatar: initialData?.avatar,
    city: initialData?.city || '',
    location: initialData?.location || '',
    address: initialData?.address || '',
    services: initialData?.services || [],
    image: initialData?.image,
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
      setFormData((prevData) => ({ ...prevData, [field]: file }));
    }
  };

  type ServiceType = { id: string; type: string };
  type ServiceDataResponse = { data: ServiceType[] };

  const { data: serviceData } = useGlobalData<ServiceDataResponse>({
    dataSourceName: `api/service_types`,
  });

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <Box sx={{ p: 4 }}>
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
            <input type="file" accept="image/*" hidden onChange={e => handleFileChange(e, 'logo')} />
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
            <input type="file" accept="image/*" hidden onChange={e => handleFileChange(e, 'avatar')} />
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
            <input type="file" accept="image/*" hidden onChange={e => handleFileChange(e, 'image')} />
          </Button>
        </Box>
      </Box>

      {/* Text Fields */}
      <Grid container spacing={2}>
        <Grid size={6}>
          <TextField
            label="Full Name"
            name="full_name"
            value={formData.full_name}
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