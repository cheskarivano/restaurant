import React, { useState } from 'react';
import {
  Container, Box, TextField, Button, Typography,
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton, Avatar
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import mockData from './data/mockData';

const App = () => {
  const [items, setItems] = useState(mockData);
  const [currentItem, setCurrentItem] = useState({
    id: null,
    category: '',
    name: '',
    options: '',
    price: '',
    cost: '',
    stock: '',
    imageUrl: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentItem(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentItem.id !== null) {
      setItems(prevItems =>
        prevItems.map(item =>
          item.id === currentItem.id ? currentItem : item
        )
      );
    } else {
      setItems(prevItems => [
        ...prevItems,
        { ...currentItem, id: new Date().getTime() }
      ]);
    }
    setCurrentItem({
      id: null,
      category: '',
      name: '',
      options: '',
      price: '',
      cost: '',
      stock: '',
      imageUrl: ''
    });
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
  };

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Restaurant Menu Manager
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="category"
            label="Category"
            name="category"
            value={currentItem.category}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            value={currentItem.name}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            id="options"
            label="Options"
            name="options"
            value={currentItem.options}
            onChange={handleChange}
            helperText="Comma separated values (e.g. Small, Medium, Large)"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="price"
            label="Price"
            name="price"
            type="number"
            value={currentItem.price}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="cost"
            label="Cost"
            name="cost"
            type="number"
            value={currentItem.cost}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="stock"
            label="Amount in stock"
            name="stock"
            type="number"
            value={currentItem.stock}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="imageUrl"
            label="Image URL"
            name="imageUrl"
            value={currentItem.imageUrl}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            {currentItem.id ? 'Update Item' : 'Add Item'}
          </Button>
        </Box>
        <Box mt={5}>
          <Typography variant="h5" component="h2" gutterBottom>
            Menu Items
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Options</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Cost</TableCell>
                  <TableCell>Stock</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map(item => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Avatar src={item.imageUrl} alt={item.name} variant="square" sx={{ width: 56, height: 56 }} />
                    </TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.options}</TableCell>
                    <TableCell>{item.price}</TableCell>
                    <TableCell>{item.cost}</TableCell>
                    <TableCell>{item.stock}</TableCell>
                    <TableCell>
                      <IconButton color="primary" onClick={() => handleEdit(item)}>
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Container>
  );
};

export default App;
