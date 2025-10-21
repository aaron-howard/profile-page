# Class Diagrams

## TypeScript/Prisma Models

### User
- id: String (PK)
- age: Int?
- sessions: Session[]

### Session
- id: String (PK)
- userId: String (FK)
- expiresAt: DateTime
- user: User

### BlogPost
- id: Int (PK)
- title: String
- excerpt: String?
- content: String
- author: String
- date: DateTime
- category: String
- readTime: String?
- featured: Boolean
- tags: String[]

### Project
- id: Int (PK)
- title: String
- description: String
- image: String?
- technologies: String[]
- category: String
- github: String?
- live: String?
- featured: Boolean

---

See `prisma/schema.prisma` for full model definitions.