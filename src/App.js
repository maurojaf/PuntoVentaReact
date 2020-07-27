import 'date-fns';
import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import InputAdornment from '@material-ui/core/InputAdornment';
import { InputLabel, MenuItem, Select } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Loading from 'react-fullscreen-loading';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(5),
  },
  paper: {
    padding: theme.spacing(4),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  hi: {
    color: '#384263'
  },
  selectEmpty: {
    marginTop: theme.spacing(1),
  },
}));

function App() {
  const classes = useStyles();
  const [_valueCodigoBarra, setValueCodigoBarra] = useState('');
  const [_valueNombre, setValueNombre] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [_valueNroSerieCarnet, setNroSerieCarnet] = useState(125487859);
  const [_valueVuelto, setValueVuelto] = useState(0);
  const [_valueDescuento, setValueDescuento] = useState(0);
  const [_valueMonto, setValueMonto] = useState(10000);
  const [_valueMontoFinal, setValueMontoFinal] = useState(0);
  const [_banco, setBanco] = useState('Vacio');
  const [_valueMontoPagadoCliente, setValueMontoPagadoCliente] = useState(0);
  const [_loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleChange = event => {
    setBanco(event.target.value);
  };
  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const calculaDescuento = async (value) => {
    setValueDescuento(value);
  };
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcako', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  useEffect(() => {
    setLoading(false);
  }, [_valueMontoFinal]);

  return (
    <div className={classes.root}>
      <form>
        <Loading loading={_loading} loaderColor="#3498db" />
        <Grid container justify="center">
          <h1 className={classes.hi}>Ventas</h1>              
        </Grid>
        <Grid container justify="center">          
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  disabled
                  variant="inline"
                  format="dd/MM/yyyy"
                  margin="normal"
                  required
                  id="fecha"
                  label="Fecha"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
        </Grid>
        <h2 className={classes.hi}>Ingresar Productos</h2>
        <Paper className={classes.paper} variant="outlined">
          <Grid container justify="center" spacing={2}>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <TextField
                margin="normal"
                label="Código de Barra"
                id="codBarra"
                fullWidth
                defaultValue={_valueCodigoBarra}
                variant="outlined"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <TextField
                margin="normal"
                label="Nombre Producto"
                id="nombre"
                fullWidth
                defaultValue={_valueNombre}
                variant="outlined"
              />
            </Grid>            
          </Grid>
        </Paper>
        <br></br>
        <Paper className={classes.paper} variant="outlined">
          <Grid container justify="center" spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Código de Barra</TableCell>
                    <TableCell align="right">Nombre Producto</TableCell>
                    <TableCell align="right">Precio Unitario</TableCell>
                    <TableCell align="right">Cantidad</TableCell>
                    <TableCell align="right">Total</TableCell>
                    <TableCell align="right">Eliminar</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.calories}</TableCell>
                      <TableCell align="right">{row.fat}</TableCell>
                      <TableCell align="right">{row.carbs}</TableCell>
                      <TableCell align="right">{row.protein}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            </Grid>
          </Grid>
        </Paper>
        <br></br>
        <Paper className={classes.paper} variant="outlined">
          <Grid container justify="center" spacing={2}>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <TextField
                margin="normal"
                label="Monto total"
                id="monto"
                fullWidth
                defaultValue={_valueMonto}
                variant="outlined"
                type="number"
                disabled
                InputProps={{
                  startAdornment: <InputAdornment position="start">$ </InputAdornment>,
                }}
                disabled
              />
            </Grid>    
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <TextField
                margin="normal"
                label="Monto pagado por cliente"
                id="montoCliente"
                fullWidth
                defaultValue={_valueMontoPagadoCliente}
                variant="outlined"
                type="number"                
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <TextField
                margin="normal"
                label="Descuento"
                id="descuento"
                fullWidth
                defaultValue={_valueDescuento}
                onChange={(u) => calculaDescuento(Number(u.target.value))}
                variant="outlined"
                type="number"                
                InputProps={{
                  startAdornment: <InputAdornment position="start">% </InputAdornment>,
                }}
              />
            </Grid>    
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <TextField
                margin="normal"
                label="Vuelto"
                id="vuelto"
                fullWidth
                defaultValue={_valueVuelto}
                variant="outlined"
                type="number"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <TextField
                margin="normal"
                label="Monto Final"
                id="montoFinal"
                fullWidth
                defaultValue={_valueMontoFinal}
                onChange={(u) => setValueMontoFinal(Number(u.target.value))}
                variant="outlined"
                type="number"
                disabled
                InputProps={{
                  startAdornment: <InputAdornment position="start">$ </InputAdornment>,
                }}
              />
            </Grid>
          </Grid>
        </Paper>
        <br></br>
        <Grid container justify="flex-end" spacing={0}>
          <Grid item xs={12} sm={6} md={6} lg={6}>
          </Grid>
          <Grid item xs={12} sm={3} md={3} lg={3}>
            <Button fullWidth id="ingresar" variant={"contained"} color="primary" onClick={() => { (console.log(_valueDescuento)) }} >
              Finalizar Pago
            </Button>
          </Grid>
        </Grid>
        {/* Sección Dialog */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth={'lg'}
          disableBackdropClick={true}
        >
          <DialogTitle id="alert-dialog-title">{"Confirmación Final"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Este es el resumen del proceso que acabas de realizar, revise bien sus datos para luego proceder a finalizar proceso
            </DialogContentText>
            <TextField
              margin="normal"
              label="Rut de Afiliado"
              id="rutConfirmar"
              fullWidth
              defaultValue={_valueCodigoBarra}
              variant="outlined"
              disabled
              required
            />
            <TextField
              margin="normal"
              label="Nombre Completo"
              id="nombreConfirmar"
              fullWidth
              defaultValue={_valueNombre}
              variant="outlined"
              required
              disabled
            />
            <FormControl variant="outlined" fullWidth>
                <InputLabel>Banco</InputLabel>
                <Select
                  placeholder="Selecciona un banco"
                  id="banco"
                  fullWidth
                  value={_banco}
                  onChange={handleChange}
                  className={classes.selectEmpty}
                >
                  <MenuItem key="0" value={"Vacio"} >Seleccione un Banco</MenuItem>
                  <MenuItem key="1" value={"Santander"} >Santander Banefe</MenuItem>
                  <MenuItem key="2" value={"BancoChile"} >Banco de Chile</MenuItem>
                  <MenuItem key="3" value={"Scotiabank"} >Scotiabank</MenuItem>
                  <MenuItem key="4" value={"Itau"} >Itau</MenuItem>
                  <MenuItem key="5" value={"BancoStado"} >Banco Estado</MenuItem>
                  <MenuItem key="6" value={"BCI"} >Banco Credito e inversiones</MenuItem>
                </Select>
              </FormControl>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                disabled
                fullWidth
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                required
                id="nacimientoConfirmar"
                label="Fecha de Nacimiento"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
            <TextField
              margin="normal"
              label="Número Serie Carnet Identidad"
              id="nroSerieCarnetConfirmar"
              fullWidth
              defaultValue={_valueNroSerieCarnet}
              variant="outlined"
              required
              disabled
            />
            <TextField
              margin="normal"
              label="Banco"
              id="bancoConfirmar"
              fullWidth
              defaultValue={_banco}
              variant="outlined"
              required
              disabled
            />
            <TextField
              margin="normal"
              label="Número cuenta corriente"
              id="ctacteConfirmar"
              fullWidth
              defaultValue={_valueMontoPagadoCliente}
              variant="outlined"
              type="number"
              required
              disabled
            />
          </DialogContent>
          <DialogActions>
            <Button variant={"contained"} color="primary" href={"/seguimientoSolicitud"} onClick={() => { (handleCloseDialog()) }} >
              Finalizar proceso
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </div >

  );
}

export default App;
