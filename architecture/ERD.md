# Entity-Relationship Diagram (ERD)

```
User (1) <---- (M) Session

BlogPost

Project
```

- **User** has many **Sessions**
- **Session** belongs to one **User**
- **BlogPost** and **Project** are standalone entities

See `prisma/schema.prisma` for details.