import { Entity } from '@backstage/catalog-model';

export const AZURE_ANNOTATION_TAG_SELECTOR = 'azure.com/tag-selector';
export const tagSelectorFromEntity = (entity: Entity) => entity?.metadata.annotations?.[AZURE_ANNOTATION_TAG_SELECTOR] ?? '';