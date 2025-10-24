import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [
    "./app/components/**/*.{js,vue,ts}",
    "./app/layouts/**/*.vue",
    "./app/pages/**/*.vue",
    "./app.vue",
  ],
  theme: {
    extend: {},
  },
}