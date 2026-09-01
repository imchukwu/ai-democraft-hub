# Production Dockerfile for AI & Democracy Forum Go Backend
FROM golang:1.22-alpine AS builder

WORKDIR /app

COPY go.mod ./
COPY main.go ./

RUN CGO_ENABLED=0 GOOS=linux go build -o server main.go

FROM alpine:latest

RUN apk --no-cache add ca-certificates

WORKDIR /app

COPY --from=builder /app/server .
COPY registrations.json ./

EXPOSE 8080
ENV PORT=8080

CMD ["./server"]
