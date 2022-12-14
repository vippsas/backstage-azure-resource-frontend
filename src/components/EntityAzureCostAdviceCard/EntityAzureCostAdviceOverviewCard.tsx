import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { InfoCard } from "@backstage/core-components";
import { GetEntityAzureResourceGroups } from "../EntityFetchAzureData";


export const EntityAzureCostAdviceCard = () => {
    return (
        <Grid container spacing={3} direction="column-reverse" >
            <Grid item>
                <InfoCard>
                    <Typography variant="body2">
                        <GetEntityAzureResourceGroups />
                    </Typography>
                </InfoCard>
            </Grid>
        </Grid>
    );
};