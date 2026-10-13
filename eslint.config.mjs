import nextVitals from 'eslint-config-next/core-web-vitals'

const eslintConfig = [
  ...nextVitals,
  {
    // Vendored from evilrabbit/lifeline (shadcn registry). It uses the
    // "latest ref" pattern on purpose, which the React Compiler lint rules
    // flag; keep the upstream code as-is so it stays easy to re-sync.
    files: ['src/components/lifeline/**'],
    rules: {
      'react-hooks/refs': 'off',
      'react-hooks/immutability': 'off',
      'react-hooks/set-state-in-effect': 'off',
    },
  },
  {
    ignores: ['.next/**', 'node_modules/**', 'next-env.d.ts', 'src/next-env.d.ts'],
  },
]

export default eslintConfig
