# linkerd-shop-app-demo

Pre-requirement:
- Docker: https://www.docker.com/get-started
- K8S: https://kubernetes.io/docs/tasks/tools/
- Linkerd: https://linkerd.io/2/getting-started/
- Traefik: https://docs.traefik.io/v2.0/getting-started/install-traefik/
- Keycloak: https://geek-cookbook.funkypenguin.co.nz/recipes/keycloak/


To install tracing to linkerd
```
linkerd install --control-plane-tracing --addon-config ./k8s/linkerd/config.yaml | kubectl apply -f -
```

To expose Linkerd Dashboard
```
linkerd dashboard -p 12345 &
```

To expose Jaeger
```
kubectl -n linkerd port-forward svc/linkerd-jaeger 16686
```

To expose ports
```
kubectl port-forward --address 0.0.0.0 service/traefik 8000:8000 8080:8080 443:4443 -n shop-app
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

To do
 - [x] Service Mesh
 - [ ] gRPC
 - [ ] SSL
 - [ ] Tracing
 - [ ] Fluend - Elastic Search - Kibana
 - [ ] Authentication with JWT
 - [ ] GitOps
 - [ ] Database