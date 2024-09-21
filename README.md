 Statsig requires an async call to evaluate feature flags. The function name changed from variation to getFeatureFlag.

### Before

```ts
const isDarkModeEnabled = ldClient.variation(
  'is-dark-mode-enabled',
  user,
  false,
);
```

### After

```ts
try {
  const isDarkModeEnabled = await client.getFeatureFlag(
    'is-dark-mode-enabled',
    user,
  );
} catch (error) {
  console.error('Failed to get feature flag:', error);
}
```

