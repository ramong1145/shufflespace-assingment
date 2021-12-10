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

export default function ActionAreaCard(props) {
  const { image, title, description, duration } = props;
  const [visible, setVisible] = useState({display: 'none', flexDirection: 'row-reverse'});
  
  function toggleButtons(e) {
    const display = e.type === 'mouseenter' ? 'flex' : 'none';
    setVisible({display, flexDirection: 'row-reverse'})
  }

  const buttons = [
    <IconButton key="edit"> <EditIcon /> </IconButton>,
    <IconButton key="delete"> <DeleteIcon /> </IconButton>
  ]

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onMouseEnter={toggleButtons} onMouseLeave={toggleButtons}>
        <div style={visible} >
          <ButtonGroup size="medium">
            {buttons}
          </ButtonGroup>
        </div>
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt="food-"
        />
        <CardContent>
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
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
