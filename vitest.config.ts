import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        include: [ "./src/**/*" ],
        includeSource: [ "./src/**/*.mts" ]
    }
});
