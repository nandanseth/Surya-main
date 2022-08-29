import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

const AlertDialog = ({
    submit = () => {
        console.log('')
    },
    handleClickOpen,
    handleClose,
    open,
}) => {
    return (
        <div>
            <Dialog
                aria-describedby="alert-dialog-description"
                aria-labelledby="alert-dialog-title"
                onClose={handleClose}
                open={open}
            >
                <DialogTitle id="alert-dialog-title">
                    {'Are you sure?'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This will be saved when you click 'Agree'.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        autoFocus
                        onClick={() => {
                            handleClose()
                            submit()
                        }}
                    >
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
export default AlertDialog
