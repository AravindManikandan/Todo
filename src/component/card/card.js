import React, { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { Grid } from "@mui/material";

const MediaCard = (props) => {
    let clicks = [];
    let timeout;

    const singleClick = (event) => {
        props.editForm(props.data.id)
    }

    const doubleClick = (event) => {
        props.completeTodo(props.data)
    }

    const clickHandler = (event) => {
        event.preventDefault();
        clicks.push(new Date().getTime());
        window.clearTimeout(timeout);
        timeout = window.setTimeout(() => {
            if (clicks.length > 1 && clicks[clicks.length - 1] - clicks[clicks.length - 2] < 250) {
                doubleClick(event.target);
            } else {
                singleClick(event.target);
            }
        }, 250);
    }
    return (
        <Card sx={{ maxWidth: 410 }} style={{ background: props.data.color }}
            onClick={(e) => clickHandler(e)}
        >
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    <Grid container lg={12} md={12}>
                        <Grid item lg={8} md={8}>{props.data.title}</Grid>
                        <Grid item lg={4} md={4} className="chipItem">
                            {(props.data.draft) ?
                                <Chip label="Draft" />
                                : ''
                            }
                        </Grid>
                    </Grid>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {props.data.description}
                </Typography>
            </CardContent>
            {/* <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions> */}
        </Card>
    );
}

export default MediaCard;