import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Paper,
  Stepper,
  Step,
  StepLabel,
  InputAdornment,
  IconButton,
  Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface WorkerProgress {
  id: number;
  name: string;
  passport: string;
  currentStep: number; // 0 - 4
}

const workflowSteps = [
  'Registered',
  'Medical Screening',
  'Training',
  'Final Review',
  'Approved',
];

const mockProgressData: WorkerProgress[] = [
  { id: 1, name: 'Ali Khan', passport: 'A1234567', currentStep: 2 },
  { id: 2, name: 'John Smith', passport: 'B9876543', currentStep: 4 },
  { id: 3, name: 'Maria Garcia', passport: 'C1122334', currentStep: 1 },
];

const ProgressPage: React.FC = () => {
  const [search, setSearch] = useState('');

  const filteredData = mockProgressData.filter((worker) =>
    worker.name.toLowerCase().includes(search.toLowerCase()) ||
    worker.passport.includes(search)
  );

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Worker Progress Tracker
      </Typography>

      <Box mb={3}>
        <TextField
          label="Search by name or passport"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {filteredData.length === 0 && (
        <Typography>No matching workers found.</Typography>
      )}

      {filteredData.map((worker) => (
        <Paper key={worker.id} sx={{ mb: 3, p: 2 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h6">{worker.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                Passport: {worker.passport}
              </Typography>
            </Box>
            <Button startIcon={<VisibilityIcon />} variant="outlined">
              View Details
            </Button>
          </Box>

          <Stepper activeStep={worker.currentStep} alternativeLabel sx={{ mt: 2 }}>
            {workflowSteps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Paper>
      ))}
    </Box>
  );
};

export default ProgressPage;
