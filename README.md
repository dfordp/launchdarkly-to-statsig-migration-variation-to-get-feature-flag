


## Example
This codemod turns X into Y. It also does Z.
Note: this is a contrived example. Please modify it.

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

