#!/bin/bash

root_folder=$(cd $(dirname $0); cd ..; pwd)
app_name="shop-app"

exec 3>&1

function _out() {
  echo "$(date +'%F %H:%M:%S') $@"
}


function buildAndDeploy() {
  _out Build $1
  cd ${root_folder}/services/$2
  docker rm container $2:latest
  docker build -f Dockerfile -t  $2:latest .

  _out Deploy $1
  cd ${root_folder}/services/$2
  cat deployment.yaml | linkerd inject - | kubectl -n ${app_name} apply -f -
}

function setup() {
  cd ${root_folder}/scripts
  ./delete-services.sh

  kubectl create ns ${app_name}
  kubectl create ns traefik

  cd ${root_folder}/k8s
  kubectl apply -f ./dnsutils.yaml

  cd ${root_folder}/k8s/linkerd
  linkerd upgrade --addon-config ./config.yaml | kubectl apply -f -
  # kubectl apply -f ./tracing.yaml

  cd ${root_folder}/k8s/traefik
  cat traefik.yaml | kubectl -n shop-app apply -f -
  cat middleware.yaml | kubectl -n shop-app apply -f -
  cat ingress.yaml | kubectl -n shop-app apply -f -

  buildAndDeploy UserService user
  buildAndDeploy ProductService product
  buildAndDeploy ReviewService review

  cd ${root_folder}/k8s
  cat sleep.yml | linkerd inject - | kubectl apply -f -
  
}

_out Deploying
setup
_out Done