import React from 'react';
import {Grid} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

const SkeletonArray = (props) => {
    return (
        <Grid container spacing={3}>
            {
                [1, 2, 3, 4].map(el => <Grid item xs={12} sm={6} md={4} lg={3} key={`todo-skeleton-item-${el}`}>
                    <Skeleton variant="text" xs={12} sm={6} md={4} lg={3}/>
                    <Skeleton variant="rect" height={118} xs={12} sm={6} md={4} lg={3}/>
                </Grid>)
            }
        </Grid>
    )
};

export default SkeletonArray;
