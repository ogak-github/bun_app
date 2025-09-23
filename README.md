# Bun + Elysia Example

This project is an example of using **Bun** and **Elysia** by following the [best practices](https://elysiajs.com/essential/best-practice.html).



To install dependencies:

```bash
bun install
```

To run:

```bash
bun run src/server.ts
```

Compile as binary:
```bash
bun build \                                                        130 ↵
        --compile \
        --minify-whitespace \
        --minify-syntax \
        --target bun \
        src/index.ts
```

This project was created using `bun init` in bun v1.2.22. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
