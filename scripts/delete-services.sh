#!/bin/bash

root_folder=$(cd $(dirname $0); cd ..; pwd)
app_name="shop-app"

exec 3>&1

function _out() {
  echo "$(date +'%F %H:%M:%S') $@"
}


function deleteService() {
  _out Deleting $1
  cd ${root_folder}/services/$2
  kubectl -n ${app_name} delete -f deployment.yaml  --ignore-not-found
}

function setup() {
  kubectl delete all --namespace=${app_name} --all --ignore-not-found
  kubectl delete all --namespace=traefik --all --ignore-not-found
  kubectl delete ns ${app_name} --ignore-not-found
  kubectl delete ns traefik --ignore-not-found

  deleteService UserService user
  deleteService ProductService product
  deleteService ReviewService review
}

_out Deleting services...
setup
_out Done