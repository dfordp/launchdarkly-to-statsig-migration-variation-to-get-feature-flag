export default function transform(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  let dirtyFlag = false;

  // Find the ldClient.variation call expressions
  root.find(j.CallExpression, {
    callee: {
      object: { name: 'ldClient' },
      property: { name: 'variation' }
    }
  }).forEach(path => {
    // Ensure the arguments are as expected
    const args = path.node.arguments;
    if (args.length === 3) {
      const [flagName, user, defaultValue] = args;

      // Replace with await client.getFeatureFlag
      const newCallExpression = j.awaitExpression(
        j.callExpression(
          j.memberExpression(
            j.identifier('client'),
            j.identifier('getFeatureFlag')
          ),
          [flagName, user]
        )
      );

      j(path).replaceWith(newCallExpression);
      dirtyFlag = true;
    }
  });

  return dirtyFlag ? root.toSource() : undefined;
}