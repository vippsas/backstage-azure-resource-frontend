import React, { useMemo, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  InputAdornment,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import TimelineIcon from '@material-ui/icons/Timeline';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import PanoramaFishEyeIcon from '@material-ui/icons/PanoramaFishEye';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import { makeStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';
import {
  cardPspExclusions,
  cardPspInventories,
  cardPspRolloutPhases,
  cardPspSharedInitiatives,
} from '../../data/cardPspGovernanceAtlas';
import type { PolicyScope, ViewMode } from '../../data/cardPspGovernanceAtlas';

const scopeOrder: PolicyScope[] = ['VippsMGMTTest', 'VippsMGMTProd'];

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minHeight: '100vh',
    padding: theme.spacing(3),
    background:
      'radial-gradient(circle at top left, rgba(51, 94, 173, 0.28), transparent 36%), radial-gradient(circle at top right, rgba(189, 112, 47, 0.2), transparent 30%), linear-gradient(180deg, #07111f 0%, #0c1729 45%, #10192b 100%)',
    color: '#eef2ff',
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(4),
    },
  },
  shell: {
    maxWidth: 1440,
    margin: '0 auto',
  },
  hero: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 28,
    border: '1px solid rgba(255, 255, 255, 0.12)',
    background:
      'linear-gradient(135deg, rgba(9, 18, 34, 0.94), rgba(14, 28, 53, 0.92) 55%, rgba(24, 35, 62, 0.95))',
    boxShadow: '0 32px 90px rgba(0, 0, 0, 0.34)',
  },
  heroGlow: {
    position: 'absolute',
    inset: 0,
    background:
      'radial-gradient(circle at 18% 20%, rgba(111, 190, 255, 0.24), transparent 22%), radial-gradient(circle at 84% 14%, rgba(255, 184, 107, 0.18), transparent 24%), linear-gradient(120deg, transparent, rgba(255,255,255,0.03), transparent)',
    pointerEvents: 'none',
  },
  heroContent: {
    position: 'relative',
    padding: theme.spacing(4),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
    },
  },
  eyebrow: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    padding: theme.spacing(0.75, 1.25),
    borderRadius: 999,
    border: '1px solid rgba(255,255,255,0.16)',
    background: 'rgba(255,255,255,0.05)',
    textTransform: 'uppercase',
    letterSpacing: 2.4,
    fontSize: 12,
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
    fontFamily: '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, serif',
    fontSize: 'clamp(2.4rem, 5vw, 4.9rem)',
    lineHeight: 0.95,
    fontWeight: 700,
    maxWidth: 980,
  },
  subtitle: {
    marginTop: theme.spacing(2),
    maxWidth: 920,
    color: 'rgba(238, 242, 255, 0.82)',
    fontSize: '1.05rem',
    lineHeight: 1.75,
  },
  metaRow: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(1.25),
  },
  metaChip: {
    background: 'rgba(255,255,255,0.08)',
    color: '#eef2ff',
    border: '1px solid rgba(255,255,255,0.14)',
    fontWeight: 600,
  },
  statsGrid: {
    marginTop: theme.spacing(4),
  },
  statCard: {
    height: '100%',
    borderRadius: 22,
    border: '1px solid rgba(255,255,255,0.08)',
    background: 'rgba(8, 15, 28, 0.88)',
    boxShadow: '0 18px 50px rgba(0, 0, 0, 0.18)',
  },
  statLabel: {
    color: 'rgba(238, 242, 255, 0.62)',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1.8,
    marginBottom: theme.spacing(1),
  },
  statValue: {
    fontSize: '2.25rem',
    fontWeight: 800,
    lineHeight: 1,
    marginBottom: theme.spacing(1),
  },
  statNote: {
    color: 'rgba(238, 242, 255, 0.72)',
    lineHeight: 1.6,
  },
  section: {
    marginTop: theme.spacing(4),
  },
  sectionHeader: {
    marginBottom: theme.spacing(2),
  },
  sectionTitle: {
    fontSize: '1.15rem',
    fontWeight: 800,
    letterSpacing: 0.2,
  },
  sectionBody: {
    color: 'rgba(238, 242, 255, 0.74)',
    marginTop: theme.spacing(0.75),
    maxWidth: 900,
    lineHeight: 1.7,
  },
  filterRow: {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr)',
    gap: theme.spacing(2),
    marginTop: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: 'minmax(0, 1.15fr) auto',
      alignItems: 'center',
    },
  },
  filterField: {
    background: 'rgba(255,255,255,0.04)',
    borderRadius: 16,
    '& .MuiOutlinedInput-root': {
      color: '#eef2ff',
      borderRadius: 16,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(255,255,255,0.14)',
    },
  },
  scopeChips: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(1),
  },
  scopeChip: {
    borderColor: 'rgba(255,255,255,0.14)',
    color: '#eef2ff',
    background: 'rgba(255,255,255,0.04)',
  },
  activeScopeChip: {
    background: 'rgba(111, 190, 255, 0.16)',
    borderColor: 'rgba(111, 190, 255, 0.38)',
  },
  panelCard: {
    height: '100%',
    borderRadius: 24,
    border: '1px solid rgba(255,255,255,0.08)',
    background: 'rgba(10, 18, 32, 0.9)',
    boxShadow: '0 18px 50px rgba(0, 0, 0, 0.14)',
  },
  panelTitle: {
    fontWeight: 800,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing(2),
  },
  itemList: {
    display: 'grid',
    gap: theme.spacing(1.5),
    marginTop: theme.spacing(2),
  },
  itemCard: {
    padding: theme.spacing(2),
    borderRadius: 18,
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
  },
  itemTitle: {
    fontWeight: 700,
    lineHeight: 1.45,
  },
  itemSummary: {
    marginTop: theme.spacing(0.9),
    color: 'rgba(238, 242, 255, 0.72)',
    lineHeight: 1.65,
  },
  itemMetaRow: {
    marginTop: theme.spacing(1.25),
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(1),
  },
  sectionCard: {
    borderRadius: 24,
    border: '1px solid rgba(255,255,255,0.08)',
    background: 'rgba(10, 18, 32, 0.9)',
    boxShadow: '0 18px 50px rgba(0, 0, 0, 0.14)',
  },
  phaseGrid: {
    display: 'grid',
    gap: theme.spacing(2),
  },
  phaseCard: {
    padding: theme.spacing(2.5),
    borderRadius: 20,
    background: 'linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.025))',
    border: '1px solid rgba(255,255,255,0.08)',
  },
  phaseKicker: {
    color: '#9ecbff',
    textTransform: 'uppercase',
    letterSpacing: 1.8,
    fontSize: 11,
    fontWeight: 700,
    marginBottom: theme.spacing(1),
  },
  bulletList: {
    margin: `${theme.spacing(1)}px 0 0`,
    paddingLeft: theme.spacing(2.25),
    color: 'rgba(238, 242, 255, 0.76)',
    lineHeight: 1.7,
  },
  emptyState: {
    padding: theme.spacing(3),
    borderRadius: 18,
    border: '1px dashed rgba(255,255,255,0.16)',
    color: 'rgba(238, 242, 255, 0.7)',
  },
}));

const totalInventoryCount =
  cardPspInventories.VippsMGMTTest.length + cardPspInventories.VippsMGMTProd.length;

const matchesSearch = (value: string, query: string) =>
  value.toLowerCase().includes(query.toLowerCase());

const CardPspGovernanceAtlasPage = () => {
  const classes = useStyles();
  const [viewMode, setViewMode] = useState<ViewMode>('inventory');
  const [scopeFilter, setScopeFilter] = useState<PolicyScope | 'all'>('all');
  const [search, setSearch] = useState('');

  const filteredInventories = useMemo(() => {
    const query = search.trim();
    return scopeOrder
      .map(scope => ({
        scope,
        items: cardPspInventories[scope].filter(item => {
          const scopeMatches = scopeFilter === 'all' || item.scope === scopeFilter;
          if (!scopeMatches) {
            return false;
          }

          if (!query) {
            return true;
          }

          return [
            item.title,
            item.summary,
            item.family,
            item.platform,
            item.focus,
            item.status,
            ...item.references,
          ].some(value => matchesSearch(value, query));
        }),
      }))
      .filter(group => group.items.length > 0);
  }, [scopeFilter, search]);

  const sharedInitiatives = useMemo(() => {
    if (!search.trim()) {
      return cardPspSharedInitiatives;
    }

    const query = search.trim();
    return cardPspSharedInitiatives.filter(item =>
      [item.family, item.title, item.summary, ...item.replicationNotes].some(value =>
        matchesSearch(value, query),
      ),
    );
  }, [search]);

  const exclusions = useMemo(() => {
    if (!search.trim()) {
      return cardPspExclusions;
    }

    const query = search.trim();
    return cardPspExclusions.filter(item =>
      [item.title, item.summary, item.targetPolicy, item.reason].some(value =>
        matchesSearch(value, query),
      ),
    );
  }, [search]);

  return (
    <Box className={classes.root}>
      <Box className={classes.shell}>
        <Box className={classes.hero}>
          <Box className={classes.heroGlow} />
          <Box className={classes.heroContent}>
            <Box className={classes.eyebrow}>
              <TimelineIcon fontSize="small" />
              Card PSP Governance Atlas
            </Box>
            <Typography className={classes.title} variant="h1">
              The current governance model, mapped for Card PSP without the usual policy fog.
            </Typography>
            <Typography className={classes.subtitle}>
              This page keeps the current VippsMGMTTest and VippsMGMTProd patterns visible,
              shows which initiatives are shared, and keeps the exceptions on the table while the
              Card PSP rollout is copied into place.
            </Typography>

            <Box className={classes.metaRow}>
              <Chip className={classes.metaChip} label="Inline typed data" />
              <Chip className={classes.metaChip} label="Inventory comparison" />
              <Chip className={classes.metaChip} label="Rollout blueprint" />
            </Box>

            <Grid container spacing={2} className={classes.statsGrid}>
              <Grid item xs={12} md={3}>
                <Card className={classes.statCard}>
                  <CardContent>
                    <Typography className={classes.statLabel}>Total inventory</Typography>
                    <Typography className={classes.statValue}>{totalInventoryCount}</Typography>
                    <Typography className={classes.statNote}>
                      Four test items and four prod items that describe the current CSIRT baseline.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={3}>
                <Card className={classes.statCard}>
                  <CardContent>
                    <Typography className={classes.statLabel}>Shared initiatives</Typography>
                    <Typography className={classes.statValue}>{cardPspSharedInitiatives.length}</Typography>
                    <Typography className={classes.statNote}>
                      The same policy families, just tuned for environment-specific storage targets.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={3}>
                <Card className={classes.statCard}>
                  <CardContent>
                    <Typography className={classes.statLabel}>Exclusions</Typography>
                    <Typography className={classes.statValue}>{cardPspExclusions.length}</Typography>
                    <Typography className={classes.statNote}>
                      Active waivers that need a hard look before Card PSP enforcement is flipped.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={3}>
                <Card className={classes.statCard}>
                  <CardContent>
                    <Typography className={classes.statLabel}>Rollout phases</Typography>
                    <Typography className={classes.statValue}>{cardPspRolloutPhases.length}</Typography>
                    <Typography className={classes.statNote}>
                      Copy, swap, re-evaluate, and then flip enforcement with guardrails.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Box>

        <Box className={classes.section}>
          <Card className={classes.sectionCard}>
            <CardContent>
              <Box className={classes.sectionHeader}>
                <Typography className={classes.sectionTitle} variant="h2">
                  Switch view
                </Typography>
                <Typography className={classes.sectionBody}>
                  Use the inventory view to compare the current state, or switch to the rollout
                  plan to see how Card PSP should inherit the same governance shape.
                </Typography>
              </Box>
              <Tabs
                value={viewMode}
                onChange={(_, nextValue) => setViewMode(nextValue as ViewMode)}
                indicatorColor="secondary"
                textColor="inherit"
                variant="fullWidth"
              >
                <Tab value="inventory" label="Inventory" />
                <Tab value="rollout" label="Rollout plan" />
              </Tabs>
            </CardContent>
          </Card>
        </Box>

        <Box className={classes.section}>
          <Card className={classes.sectionCard}>
            <CardContent>
              <Box className={classes.sectionHeader}>
                <Typography className={classes.sectionTitle} variant="h2">
                  Filter inventory
                </Typography>
                <Typography className={classes.sectionBody}>
                  Search across the current policy families, region targets, and explanatory notes.
                </Typography>
              </Box>

              <Box className={classes.filterRow}>
                <TextField
                  value={search}
                  onChange={event => setSearch(event.target.value)}
                  variant="outlined"
                  fullWidth
                  placeholder="Search policy titles, families, regions, or notes"
                  className={classes.filterField}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon style={{ color: 'rgba(238, 242, 255, 0.7)' }} />
                      </InputAdornment>
                    ),
                  }}
                />

                <Box className={classes.scopeChips}>
                  {(['all', ...scopeOrder] as const).map(scope => {
                    const active = scopeFilter === scope;
                    return (
                      <Chip
                        key={scope}
                        label={scope === 'all' ? 'All scopes' : scope}
                        onClick={() => setScopeFilter(scope)}
                        clickable
                        className={`${classes.scopeChip} ${active ? classes.activeScopeChip : ''}`}
                      />
                    );
                  })}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>

        {viewMode === 'inventory' ? (
          <>
            <Box className={classes.section}>
              <Grid container spacing={3}>
                {scopeOrder.map(scope => {
                  const items =
                    filteredInventories.find(entry => entry.scope === scope)?.items ?? [];

                  return (
                    <Grid item xs={12} md={6} key={scope}>
                      <Card className={classes.panelCard}>
                        <CardContent>
                          <Typography className={classes.panelTitle} variant="h3">
                            {scope}
                            <Chip
                              size="small"
                              label={`${cardPspInventories[scope].length} items`}
                              className={classes.metaChip}
                            />
                          </Typography>
                          <Typography className={classes.sectionBody}>
                            The current policy shape for {scope} keeps the same CSIRT families and
                            only changes the storage target and region-specific wiring.
                          </Typography>

                          <Box className={classes.itemList}>
                            {items.length > 0 ? (
                              items.map(item => (
                                <Box className={classes.itemCard} key={item.id}>
                                  <Typography className={classes.itemTitle}>{item.title}</Typography>
                                  <Typography className={classes.itemSummary}>
                                    {item.summary}
                                  </Typography>
                                  <Box className={classes.itemMetaRow}>
                                    <Chip size="small" label={item.family} />
                                    <Chip size="small" label={item.platform} />
                                    <Chip size="small" label={item.focus} variant="outlined" />
                                    <Chip size="small" label={item.status} color="primary" />
                                  </Box>
                                </Box>
                              ))
                            ) : (
                              <Box className={classes.emptyState}>
                                No {scope.toLowerCase()} items match the current filter.
                              </Box>
                            )}
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>

            <Box className={classes.section}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={7}>
                  <Card className={classes.panelCard}>
                    <CardContent>
                      <Typography className={classes.panelTitle} variant="h3">
                        Shared initiatives
                        <Chip
                          size="small"
                          label={`${sharedInitiatives.length} matches`}
                          className={classes.metaChip}
                        />
                      </Typography>
                      <Typography className={classes.sectionBody}>
                        These are the policy families that should look the same in test and prod.
                        The differences should stay in the target resources, not in the governance
                        intent.
                      </Typography>

                      <Box className={classes.itemList}>
                        {sharedInitiatives.map(item => (
                          <Box className={classes.itemCard} key={item.title}>
                            <Typography className={classes.itemTitle}>{item.title}</Typography>
                            <Typography className={classes.itemSummary}>{item.summary}</Typography>
                            <Box className={classes.itemMetaRow}>
                              <Chip size="small" label={item.family} />
                              <Chip size="small" label={`Test: ${item.testVariantId}`} />
                              <Chip size="small" label={`Prod: ${item.prodVariantId}`} />
                            </Box>
                            <Divider style={{ margin: '16px 0', background: 'rgba(255,255,255,0.08)' }} />
                            <Box className={classes.itemMetaRow}>
                              {item.replicationNotes.map(note => (
                                <Chip key={note} size="small" label={note} variant="outlined" />
                              ))}
                            </Box>
                          </Box>
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} md={5}>
                  <Card className={classes.panelCard}>
                    <CardContent>
                      <Typography className={classes.panelTitle} variant="h3">
                        Exclusions
                        <Chip
                          size="small"
                          label={`${exclusions.length} waivers`}
                          className={classes.metaChip}
                        />
                      </Typography>
                      <Typography className={classes.sectionBody}>
                        These waivers are the main thing to revisit before Card PSP gets copied over.
                        A clean rollout should shrink this list, not inherit it blindly.
                      </Typography>

                      <Box className={classes.itemList}>
                        {exclusions.length > 0 ? (
                          exclusions.map(item => (
                            <Box className={classes.itemCard} key={item.title}>
                              <Typography className={classes.itemTitle}>{item.title}</Typography>
                              <Typography className={classes.itemSummary}>{item.summary}</Typography>
                              <Box className={classes.itemMetaRow}>
                                <Chip size="small" label={item.scope} />
                                <Chip size="small" label={item.targetPolicy} variant="outlined" />
                              </Box>
                              <Typography className={classes.itemSummary}>{item.reason}</Typography>
                            </Box>
                          ))
                        ) : (
                          <Box className={classes.emptyState}>No exclusions match the current filter.</Box>
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </>
        ) : (
          <Box className={classes.section}>
            <Card className={classes.panelCard}>
              <CardContent>
                <Typography className={classes.panelTitle} variant="h3">
                  Rollout plan
                  <Chip size="small" label="Card PSP" className={classes.metaChip} />
                </Typography>
                <Typography className={classes.sectionBody}>
                  The rollout should feel like a controlled copy of the current governance model,
                  not a redesign. Each phase keeps the baseline visible and narrows the changes to
                  the platform-specific parts.
                </Typography>

                <Box className={classes.phaseGrid}>
                  {cardPspRolloutPhases.map(phase => (
                    <Box className={classes.phaseCard} key={phase.title}>
                      <Typography className={classes.phaseKicker}>{phase.title}</Typography>
                      <Typography className={classes.itemTitle}>{phase.objective}</Typography>

                      <Typography className={classes.itemSummary}>Highlights</Typography>
                      <ul className={classes.bulletList}>
                        {phase.highlights.map(point => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>

                      <Typography className={classes.itemSummary}>Exit criteria</Typography>
                      <ul className={classes.bulletList}>
                        {phase.exitCriteria.map(point => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </Box>
                  ))}
                </Box>

                <Box
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: 12,
                    marginTop: 24,
                  }}
                >
                  <Chip icon={<AssignmentTurnedInIcon />} label="Copy the governance spine" />
                  <Chip icon={<PanoramaFishEyeIcon />} label="Swap platform resources" />
                  <Chip icon={<ReportProblemOutlinedIcon />} label="Re-evaluate exceptions" />
                </Box>
              </CardContent>
            </Card>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CardPspGovernanceAtlasPage;
