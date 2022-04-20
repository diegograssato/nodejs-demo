# [Choice] Node.js version (use -bullseye variants on local arm64/Apple Silicon): 16, 14, 12, 16-bullseye, 14-bullseye, 12-bullseye, 16-buster, 14-buster, 12-buster
ARG VARIANT=16-bullseye
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:0-${VARIANT}


# RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
# RUN echo "deb https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
# [Optional] Uncomment this section to install additional OS packages.
# RUN sudo apt-get update && export DEBIAN_FRONTEND=noninteractive \
#     && sudo apt-get -y install --no-install-recommends iputils-ping

# [Optional] Uncomment if you want to install an additional version of node using nvm
# ARG EXTRA_NODE_VERSION=10
# RUN su node -c "source /usr/local/share/nvm/nvm.sh && nvm install ${EXTRA_NODE_VERSION}"

# [Optional] Uncomment if you want to install more global node modules
#RUN su node -c "npm install -g nodemon"
ARG USERNAME=node
ARG USER_UID=1000
ARG USER_GID=$USER_UID
# USER root
# RUN groupmod --gid $USER_GID $USERNAME
# RUN usermod --uid $USER_UID --gid $USER_GID $USERNAME
# # RUN chown -R $USER_UID:$USER_GID /home/$USERNAME
# USER node
