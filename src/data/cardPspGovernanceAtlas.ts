export type PolicyScope = 'VippsMGMTTest' | 'VippsMGMTProd';

export type ViewMode = 'inventory' | 'rollout';

export interface PolicyVariant {
  id: string;
  scope: PolicyScope;
  title: string;
  summary: string;
  family: string;
  platform: string;
  focus: string;
  status: 'active' | 'planned' | 'exception';
  references: string[];
}

export interface SharedInitiative {
  family: string;
  title: string;
  summary: string;
  testVariantId: string;
  prodVariantId: string;
  replicationNotes: string[];
}

export interface PolicyExclusion {
  title: string;
  scope: PolicyScope | 'cross-scope';
  summary: string;
  targetPolicy: string;
  reason: string;
}

export interface RolloutPhase {
  title: string;
  objective: string;
  highlights: string[];
  exitCriteria: string[];
}

export const cardPspInventories: Record<PolicyScope, PolicyVariant[]> = {
  VippsMGMTTest: [
    {
      id: 'test-aks-ne',
      scope: 'VippsMGMTTest',
      title: 'CSIRT - AKS Management Logs to storage account - northeurope - Test',
      summary:
        'Sends AKS management logs to the shared NE archive storage account with platform-scoped role assignment.',
      family: 'CSIRT diagnostics',
      platform: 'AKS management logs',
      focus: 'northeurope',
      status: 'active',
      references: ['policyAssignments/8345ac6646e44c09a77b038c'],
    },
    {
      id: 'test-aks-we',
      scope: 'VippsMGMTTest',
      title: 'CSIRT - AKS Management Logs to storage account - westeurope - Test',
      summary:
        'Copies the same AKS diagnostic pattern to the WE archive target so test can follow prod by region.',
      family: 'CSIRT diagnostics',
      platform: 'AKS management logs',
      focus: 'westeurope',
      status: 'active',
      references: ['policyAssignments/f0a46579abf04c8583c153e9'],
    },
    {
      id: 'test-kv-ne',
      scope: 'VippsMGMTTest',
      title: 'Vipps - CSIRT - Enable logging for Key vaults to Storage - northeurope',
      summary:
        'Captures Key Vault logs in the NE archive storage account using the standard allLogs diagnostic profile.',
      family: 'CSIRT diagnostics',
      platform: 'Key Vault logging',
      focus: 'northeurope',
      status: 'active',
      references: ['policyAssignments/0cfd4597b44e4e36a411ff3a'],
    },
    {
      id: 'test-kv-we',
      scope: 'VippsMGMTTest',
      title: 'Vipps - CSIRT - Enable logging for Key vaults to Storage - westeurope',
      summary:
        'Matches the prod sibling and keeps the storage target aligned for the West Europe estate.',
      family: 'CSIRT diagnostics',
      platform: 'Key Vault logging',
      focus: 'westeurope',
      status: 'active',
      references: ['policyAssignments/5ec82a4841a1407081efa66b'],
    },
  ],
  VippsMGMTProd: [
    {
      id: 'prod-aks-ne',
      scope: 'VippsMGMTProd',
      title: 'CSIRT - AKS Management Logs to storage account - northeurope - prod',
      summary:
        'Prod counterpart for the NE AKS logging path, using the same identity and archive design as test.',
      family: 'CSIRT diagnostics',
      platform: 'AKS management logs',
      focus: 'northeurope',
      status: 'active',
      references: ['policyAssignments/cbd9ebb9e1e946278f9b3bf8'],
    },
    {
      id: 'prod-aks-we',
      scope: 'VippsMGMTProd',
      title: 'CSIRT - AKS Management Logs to storage account - westeurope - prod',
      summary:
        'Prod counterpart for the WE AKS logging path, keeping the region-specific archive alignment intact.',
      family: 'CSIRT diagnostics',
      platform: 'AKS management logs',
      focus: 'westeurope',
      status: 'active',
      references: ['policyAssignments/8155ac111e8a4f578963a7fe'],
    },
    {
      id: 'prod-kv-ne',
      scope: 'VippsMGMTProd',
      title: 'Vipps - CSIRT - Enable logging for Key vaults to Storage - northeurope',
      summary:
        'Prod version of the Key Vault logging initiative, wired to the NE cold storage archive.',
      family: 'CSIRT diagnostics',
      platform: 'Key Vault logging',
      focus: 'northeurope',
      status: 'active',
      references: ['policyAssignments/3ae2f5594b3a4a709390b1ae'],
    },
    {
      id: 'prod-kv-we',
      scope: 'VippsMGMTProd',
      title: 'Vipps - CSIRT - Enable logging for Key vaults to Storage - westeurope',
      summary:
        'Prod version of the Key Vault logging initiative, wired to the WE cold storage archive.',
      family: 'CSIRT diagnostics',
      platform: 'Key Vault logging',
      focus: 'westeurope',
      status: 'active',
      references: ['policyAssignments/295b49377d5c4584a1169ce6'],
    },
  ],
};

export const cardPspSharedInitiatives: SharedInitiative[] = [
  {
    family: 'AKS management logs',
    title: 'Mirror the AKS logging policy family across test and prod',
    summary:
      'Use the same identity, storage archive pattern, and regional split in both environments so the rollout stays boring in the best way.',
    testVariantId: 'test-aks-ne',
    prodVariantId: 'prod-aks-ne',
    replicationNotes: [
      'Keep the same managed identity pattern.',
      'Swap only the storage account target and region-specific parameters.',
      'Treat test and prod as the same governance story with different blast radius.',
    ],
  },
  {
    family: 'AKS management logs',
    title: 'Keep the west Europe variant aligned',
    summary:
      'The west Europe variant should follow the same policy shape, just with the archive target and role scope adjusted for the environment.',
    testVariantId: 'test-aks-we',
    prodVariantId: 'prod-aks-we',
    replicationNotes: [
      'Preserve the assignment name pattern.',
      'Do not fork the policy intent between environments.',
      'Use the same review checklist before flipping enforcement.',
    ],
  },
  {
    family: 'Key Vault logging',
    title: 'Re-use the Key Vault diagnostics baseline',
    summary:
      'The Key Vault logging policy is already matched between test and prod, which makes it a good template for the Card PSP copy.',
    testVariantId: 'test-kv-ne',
    prodVariantId: 'prod-kv-ne',
    replicationNotes: [
      'Copy the assignment structure before introducing PSP-specific parameters.',
      'Validate the storage target and region mapping first.',
      'Keep the compliance message and role grant style consistent.',
    ],
  },
  {
    family: 'Key Vault logging',
    title: 'West Europe logging should stay symmetrical',
    summary:
      'The west Europe Key Vault assignment is the clearest example of how the rollout should look when the platform resources are swapped.',
    testVariantId: 'test-kv-we',
    prodVariantId: 'prod-kv-we',
    replicationNotes: [
      'Use it as the reference shape for Card PSP.',
      'Retire environment-specific prose once the shared baseline is stable.',
      'Capture exceptions only when the PSP delta is proven and documented.',
    ],
  },
];

export const cardPspExclusions: PolicyExclusion[] = [
  {
    title: 'Data & Insight Prod - subnet NSG exemption',
    scope: 'VippsMGMTProd',
    summary: 'Temporary waiver for a Terraform limitation on subnet-to-NSG enforcement.',
    targetPolicy: 'Vipps - Deny - Subnets should be associated with a Network Security Group',
    reason: 'Keeps the Databricks rollout unblocked until the Terraform workaround is removed.',
  },
  {
    title: 'Data & Insight Test - subnet NSG exemption',
    scope: 'VippsMGMTTest',
    summary: 'Same Terraform limitation, but in the test management group.',
    targetPolicy: 'Vipps - Deny - Subnets should be associated with a Network Security Group',
    reason: 'Matches the prod waiver while the platform issue still exists.',
  },
  {
    title: 'SMB Test - FrontDoor exemption',
    scope: 'VippsMGMTTest',
    summary: 'Allows the SMB test subscription to use FrontDoor resources.',
    targetPolicy: 'Vipps - Deny - FrontDoor_1',
    reason: 'Keeps the test flow available for the affected workload.',
  },
  {
    title: 'User Security Test - APIM exemption',
    scope: 'VippsMGMTTest',
    summary: 'Lets the User Security Test subscription deploy APIM resources.',
    targetPolicy: 'Vipps - Deny - APIM_1',
    reason: 'Supports a controlled exception for the consumer-facing test environment.',
  },
  {
    title: 'Merchant Profile Test - FrontDoor exemption',
    scope: 'VippsMGMTTest',
    summary: 'FrontDoor waiver for the Merchant Profile Test subscription.',
    targetPolicy: 'Vipps - Deny - FrontDoor_1',
    reason: 'Keeps the test path open while the policy baseline stays in place.',
  },
  {
    title: 'Platform Test - all resources exemption',
    scope: 'VippsMGMTTest',
    summary: 'Broad waiver for the Platform Test subscription.',
    targetPolicy: 'Vipps - Deny - deployment of restricted Azure resources',
    reason: 'Used as a deliberate exception while the test estate absorbs change.',
  },
  {
    title: 'Plattform Prod - all resources exemption',
    scope: 'VippsMGMTProd',
    summary: 'Broad waiver for the Plattform Prod subscription.',
    targetPolicy: 'Vipps - Deny - deployment of restricted Azure resources',
    reason: 'Lets the platform subscription operate without the restricted resources gate.',
  },
  {
    title: 'Internal Tools - AppGW exemption',
    scope: 'VippsMGMTProd',
    summary: 'App Gateway waiver for the Internal Tools subscription.',
    targetPolicy: 'Vipps - Deny - AppGW_1',
    reason: 'Contains the impact to the specific workload that still needs the gateway.',
  },
  {
    title: 'Merchant Profile Prod - FrontDoor exemption',
    scope: 'VippsMGMTProd',
    summary: 'FrontDoor waiver for the Merchant Profile Prod subscription.',
    targetPolicy: 'Vipps - Deny - FrontDoor_1',
    reason: 'Keeps prod traffic flowing while the policy baseline remains authoritative.',
  },
  {
    title: 'SMB Prod - FrontDoor exemption',
    scope: 'VippsMGMTProd',
    summary: 'FrontDoor waiver for the SMB Prod subscription.',
    targetPolicy: 'Vipps - Deny - FrontDoor_1',
    reason: 'Tracks one of the active production exceptions that needs re-review before PSP cutover.',
  },
];

export const cardPspRolloutPhases: RolloutPhase[] = [
  {
    title: '1. Copy the governance spine',
    objective: 'Start from the current MGMTTest and MGMTProd policy shape instead of inventing a new taxonomy.',
    highlights: [
      'Keep the same family names and management-group patterns.',
      'Use the current assignments as the reference shape for Card PSP.',
      'Preserve the review and approval flow that already works.',
    ],
    exitCriteria: [
      'Card PSP inventory mirrors the existing baseline.',
      'The new route can explain test, prod, shared initiatives, and exceptions in one view.',
    ],
  },
  {
    title: '2. Swap platform-specific resources',
    objective: 'Replace Azure Policy resource targets that belong to the old platform with Card PSP equivalents.',
    highlights: [
      'Update storage accounts, diagnostic targets, and region bindings.',
      'Keep identity and role grants aligned across both environments.',
      'Avoid changing the policy intent while swapping the implementation plumbing.',
    ],
    exitCriteria: [
      'Only Card PSP-specific resource references remain in the rollout plan.',
      'The dashboard can show the before/after resource mapping without ambiguity.',
    ],
  },
  {
    title: '3. Re-evaluate exceptions',
    objective: 'Review every waiver and decide whether it should be copied, narrowed, or removed.',
    highlights: [
      'Treat temporary waivers as explicit debt, not as defaults.',
      'Keep the scope of each exception as small as possible.',
      'Require a clear owner and a next review date before carrying anything forward.',
    ],
    exitCriteria: [
      'Each carried exception has a documented justification.',
      'The exemption list is smaller after the Card PSP migration than before it.',
    ],
  },
  {
    title: '4. Flip enforcement with guardrails',
    objective: 'Move the final rollout into enforcement only after the copied policy set has been validated end to end.',
    highlights: [
      'Stage the cutover behind a clear approval checkpoint.',
      'Keep a rollback note ready for the first enforcement pass.',
      'Watch the dashboard for drift between test and prod after the switch.',
    ],
    exitCriteria: [
      'The new policy atlas can be used as the operational checklist for the cutover.',
      'Stakeholders can see what changed, what stayed shared, and what remains exceptional.',
    ],
  },
];

