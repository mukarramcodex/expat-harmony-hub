// src/pages/workers/Manage.tsx
import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface Worker {
  id: number;
  name: string;
  passport: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

const mockWorkers: Worker[] = [
  { id: 1, name: 'Ali Khan', passport: 'A1234567', status: 'Pending' },
  { id: 2, name: 'John Smith', passport: 'B9876543', status: 'Approved' },
  { id: 3, name: 'Maria Garcia', passport: 'C1122334', status: 'Rejected' },
];

const ManageWorkers: React.FC = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [workers, setWorkers] = useState<Worker[]>(mockWorkers);

  const filteredWorkers = workers.filter((worker) =>
    (worker.name.toLowerCase().includes(search.toLowerCase()) ||
      worker.passport.includes(search)) &&
    (statusFilter ? worker.status === statusFilter : true)
  );

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Manage Expat Workers
      </Typography>

      {/* Filters */}
      <Box display="flex" gap={2} mb={3} flexWrap="wrap">
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

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            label="Status"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Approved">Approved</MenuItem>
            <MenuItem value="Rejected">Rejected</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Passport</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredWorkers.map((worker) => (
              <TableRow key={worker.id}>
                <TableCell>{worker.name}</TableCell>
                <TableCell>{worker.passport}</TableCell>
                <TableCell>{worker.status}</TableCell>
                <TableCell align="right">
                  <IconButton size="small" color="primary">
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton size="small" color="secondary">
                    <EditIcon />
                  </IconButton>
                  <IconButton size="small" color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {filteredWorkers.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No workers found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination (Optional) */}
      <Box mt={3} display="flex" justifyContent="center">
        <Pagination count={5} color="primary" />
      </Box>
    </Box>
  );
};

export default ManageWorkers;
