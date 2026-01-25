# FoxYvn Landing - Secure Isolated Development Environment
# React 19 + TypeScript + Vite + Tailwind CSS 4
# Rootless container with non-root user

FROM node:22-alpine

# Install pnpm globally (as root, before switching user)
RUN npm install -g pnpm@latest

# Set working directory
WORKDIR /workspace

# Copy package files AND patches directory first for better caching
# Use node:node ownership (node user already exists with UID 1000)
COPY --chown=node:node ../package.json ../pnpm-lock.yaml* ./
COPY --chown=node:node ../patches ./patches

# Switch to non-root user for all subsequent commands
USER node

# Install dependencies as non-root user
RUN pnpm install --frozen-lockfile || pnpm install

# Copy all files
COPY --chown=node:node ../ ./

# Expose Vite dev server port
EXPOSE 5173

# Health check (wget may not be available, use node instead)
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5173', (res) => process.exit(res.statusCode === 200 ? 0 : 1))" || exit 1

# Default command: run dev server
CMD ["pnpm", "dev", "--host", "0.0.0.0"]
