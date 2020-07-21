# linkerd-shop-app-demo

Pre-requirement:
- Docker: https://www.docker.com/get-started
- K8S: https://kubernetes.io/docs/tasks/tools/
- Linkerd: https://linkerd.io/2/getting-started/
- Traefik: https://docs.traefik.io/v2.0/getting-started/install-traefik/
- Keycloak: https://geek-cookbook.funkypenguin.co.nz/recipes/keycloak/


```
kubectl -n shop-app set env --all deploy OC_AGENT_HOST=linkerd-collector.linkerd:55678
```

```
linkerd install --control-plane-tracing --addon-config ./k8s/linkerd/config.yaml | kubectl apply -f -
```

```
linkerd dashboard -p 12345 &
```

```
kubectl -n linkerd port-forward svc/linkerd-jaeger 16686
```

To get pods
```
kubectl get po -n shop-app
```

To describe pod
```
kubectl describe pod -n shop-app <pod_id>
```

To get pod's log
```
kubectl logs -n shop-app -c <service> -p <pod_id>
```