import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function ActionAreaCard(props) {
  const { image, title, description, duration } = props;

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
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
