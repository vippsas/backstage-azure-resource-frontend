import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { InfoCard } from "@backstage/core-components";
import { GetEntityAzureSecurityRecommendations } from "../EntityFetchAzureData";


export const EntityAzureSecurityCard = () => {
    return (
        <Grid container spacing={3} direction="column-reverse" >
            <Grid item>
                <InfoCard>
                    <Typography variant="body2">
                        <GetEntityAzureSecurityRecommendations />
                    </Typography>
                </InfoCard>
            </Grid>
        </Grid>
    );
};