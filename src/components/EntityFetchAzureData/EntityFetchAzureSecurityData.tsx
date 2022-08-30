import React from 'react';
import { Table, TableColumn, Progress } from '@backstage/core-components';
import { useAsync } from 'react-use';
import { useApi, configApiRef } from '@backstage/core-plugin-api';
import { Chip } from '@material-ui/core';
import { useEntity } from '@backstage/plugin-catalog-react';
import { AZURE_ANNOTATION_TAG_SELECTOR } from '../entityData';

type SecurityRec = {
    link: string;
    resourceId: any;
    displayName: string;
    resourceName: string;
    resourceType: string;
    resourceGroup: any;
    severity: string;
}

type TableOutput = {
    recommendation: string;
    resources: JSX.Element;
    severity: string;
}


export const GetEntityAzureSecurityRecommendations = () => {
    const { entity } = useEntity();
    const [tagKey, tagValue] = (
      entity?.metadata.annotations?.[AZURE_ANNOTATION_TAG_SELECTOR] ?? '/'
    ).split('/');
    
    const config = useApi(configApiRef);
    const backendUrl = config.getString('backend.baseUrl');
    const { value, loading, error } = useAsync(async (): Promise<SecurityRec[]> => {
        const response = await fetch(`${backendUrl}/api/azure-resources/rg/${tagKey}/${tagValue}/secrecommendations`);
        const json = await response.json();
        return json.data;
    }, []);

    if (loading) {
        return <Progress />;
    } else if (error) {
        return <div>{error.message}</div>;
    }

    const recommendations: any = {};
    const secData: TableOutput[] = [];
    (value || []).forEach((item: SecurityRec) => {
        if(!recommendations[item.displayName]){
            recommendations[item.displayName] = []
            secData.push({
                recommendation: item.displayName,
                resources: <ul>{recommendations[item.displayName]}</ul>,
                severity: item.severity
            });
        }
        recommendations[item.displayName].push(<Chip component="a" target="_blank" href={`http://${item.link}`} label={item.resourceName} clickable size='small' variant='outlined'/>)
    }); 

    const columns: TableColumn[] = [
        { title: 'Recommendation', field: 'recommendation', defaultGroupOrder: 0},
        { title: 'Resource', field: 'resources'},
        { title: 'Severity', field: 'severity'}
    ];

    return (
        <Table
            title='Security recommendations'
            options={{ search: true, paging: false, grouping: true}}
            columns={columns}
            data={secData}
        />
    );
};