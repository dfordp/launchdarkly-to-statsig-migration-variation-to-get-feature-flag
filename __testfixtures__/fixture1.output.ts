try {
  const isDarkModeEnabled = await client.getFeatureFlag(
    'is-dark-mode-enabled',
    user,
  );
} catch (error) {
  console.error('Failed to get feature flag:', error);
}