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

export interface FormData {
  city: string;
  name: string;
  address: string;
  email: string;
  phone: string;
  services: string[];
  image?: File; // لإضافة ملف الصورة
}

interface DynamicFormProps {
  mode: 'add' | 'edit'; // لتحديد ما إذا كان الكومبوننت في وضع الإضافة أو التعديل
  initialData?: FormData; // بيانات البداية (لوضع التعديل)
  onSubmit: (data: FormData) => void; // الدالة التي سيتم تنفيذها عند الضغط على حفظ التغييرات
}

const DynamicForm: React.FC<DynamicFormProps> = ({
  mode,
  initialData,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<FormData>({
    city: initialData?.city || '',
    name: initialData?.name || '',
    address: initialData?.address || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    services: initialData?.services || [],
    image: initialData?.image, // إذا كانت هناك صورة موجودة مسبقاً
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

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData((prevData) => ({ ...prevData, image: file }));
    }
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <Box sx={{ p: 4 }}>
      {/* صورة */}
      <Box sx={{ display: 'flex', justifyContent: 'end', mb: 2 }}>
        {formData.image && (
          <Avatar
            alt="صورة الملف"
            src={URL.createObjectURL(formData.image)}
            sx={{ mr: 2 }}
          />
        )}
        <Button variant="contained" color="error" size="small">
          حذف الصورة
        </Button>
        <Button variant="outlined" color="primary" size="small" sx={{ ml: 2 }}>
          اختيار ملف
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImageChange}
            id="image-upload"
          />
          <label htmlFor="image-upload">
            <span style={{ cursor: 'pointer' }}>اختر صورة</span>
          </label>
        </Button>
      </Box>

      {/* الحقول النصية */}
      <Grid container spacing={2}>
        <Grid size={6}>
          <TextField
            label="المدينة"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            fullWidth
            required
          />
        </Grid>
        <Grid size={6}>
          <TextField
            label="الاسم بالكامل"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            fullWidth
            required
          />
        </Grid>
        <Grid size={6}>
          <TextField
            label="العنوان"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            fullWidth
            required
          />
        </Grid>
        <Grid size={6}>
          <TextField
            label="البريد الإلكتروني"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            fullWidth
            required
          />
        </Grid>
        <Grid size={6}>
          <TextField
            label="رقم الموبايل"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            fullWidth
            required
          />
        </Grid>
      </Grid>

      {/* خدمات */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle1">أنواع الخدمات</Typography>
        <Grid container spacing={2}>
          <Grid size={4}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.services.includes('أجار شاليهات')}
                  onChange={handleCheckboxChange}
                  name="أجار شاليهات"
                />
              }
              label="أجار شاليهات"
            />
          </Grid>
          <Grid size={4}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.services.includes('أجار غرف فندقية')}
                  onChange={handleCheckboxChange}
                  name="أجار غرف فندقية"
                />
              }
              label="أجار غرف فندقية"
            />
          </Grid>
          <Grid size={4}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.services.includes('أجار سيارات')}
                  onChange={handleCheckboxChange}
                  name="أجار سيارات"
                />
              }
              label="أجار سيارات"
            />
          </Grid>
          <Grid size={4}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.services.includes('أجار بيوت')}
                  onChange={handleCheckboxChange}
                  name="أجار بيوت"
                />
              }
              label="أجار بيوت"
            />
          </Grid>
          <Grid size={4}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.services.includes('أجار مسابح')}
                  onChange={handleCheckboxChange}
                  name="أجار مسابح"
                />
              }
              label="أجار مسابح"
            />
          </Grid>
          <Grid size={4}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.services.includes('أجار مزارع')}
                  onChange={handleCheckboxChange}
                  name="أجار مزارع"
                />
              }
              label="أجار مزارع"
            />
          </Grid>
        </Grid>
      </Box>

      {/* زر حفظ التغييرات */}
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ px: 4 }}
        >
          حفظ التغييرات
        </Button>
      </Box>
    </Box>
  );
};

export default DynamicForm;