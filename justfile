# Define the DOCKER_HOST environment variable for remote connection
DOCKER_HOST := "ssh://root@nix01"

# Recipe to run any docker compose command on the remote host
# Usage: just compose <your-docker-compose-command-and-arguments>
compose *args:
  @echo "Connecting to remote Docker host for compose: {{DOCKER_HOST}}"
  @DOCKER_HOST={{DOCKER_HOST}} docker compose {{args}}


# Convenience recipe to bring up the docker compose services
# Usage: just up
up:
  just compose up --build -d

down:
  just compose down

watch:
  just compose up --build --watch

logs:
  just compose logs --tail 200

# Convenience recipe to restart the docker compose services
# Usage: just restart
restart:
  just compose down
  just compose up --build -d

# Example usage:
# just compose up -d
# just compose down
# just up
# just logs
# just restart
