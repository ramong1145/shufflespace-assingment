import React, {useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ButtonGroup from '@mui/material/ButtonGroup';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';

export default function ActionAreaCard(props) {
  const { id, image, title, description, duration, onClose } = props;
  const [visible, setVisible] = useState({display: 'none', flexDirection: 'row-reverse'});
  const [isEditing, setIsEditing] = useState(false);
  
  function toggleButtons(e) {
    const display = e.type === 'mouseenter' ? 'flex' : 'none';
    setVisible({display, flexDirection: 'row-reverse'})
  }

  function handleDelete(e) {
  }

  function handleEdit(e) {
    setIsEditing(!isEditing);
  }

  function handleSave(e) {
  }

  function handleCancel(e) {
    setIsEditing(false);
  }

  const buttons = [
    <IconButton key="edit" onClick={handleEdit}> <EditIcon /> </IconButton>,
    <IconButton key="delete" onClick={handleDelete}> <DeleteIcon /> </IconButton>,
    <IconButton key="save" onClick={handleSave}> <SaveIcon /> </IconButton>,
    <IconButton key="cancel" onClick={handleCancel}> <CloseIcon /> </IconButton>
  ]

  return (
    <Card sx={{ maxWidth: 345 }} onMouseEnter={toggleButtons} onMouseLeave={toggleButtons}>
      <div style={visible} >
        <ButtonGroup size="medium">
          {!isEditing ? buttons[0] : buttons[2]}
          {!isEditing ? buttons[1] : buttons[3]}
        </ButtonGroup>
      </div>
      <CardActionArea >
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt="food-"
        />
        <CardContent>
          {
            !isEditing ?
            <div>
              <Typography gutterBottom variant="h5" component="div">
                {title} 
              </Typography>
              <div className='card-details' style={{display:'inline-block'}}>
                <table>
                    <tr>
                      <td style={{textAlign:'justify', paddingRight:'30px'}}>
                        <Typography variant="body2" color="text.secondary">
                          {description}
                        </Typography>
                      </td>
                      <td style={{textAlign:'center', fontSize:'15px', wordSpacing:'0.5px'}}>
                        <strong> {duration} </strong>
                        <p> mins </p>
                      </td>
                    </tr>
                </table>
              </div>
            </div> 
            : <div>
              <TextField id="standard-basic" label="Standard" variant="standard" />
              <div className='card-details' style={{display:'inline-block'}}>
                <table>
                    <tr>
                      <td style={{textAlign:'justify', paddingRight:'30px'}}>
                      <TextField id="outlined-textarea" label="Multiline Placeholder" placeholder="Placeholder" multiline />
                      </td>
                      <td style={{textAlign:'center', fontSize:'15px', wordSpacing:'0.5px'}}>
                      <TextField id="outlined-number" label="Number" type="number" InputLabelProps={{shrink: true}} />
                        <p> mins </p>
                      </td>
                    </tr>
                </table>
              </div>
            </div>
          }
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
