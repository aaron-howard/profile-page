# State Diagram: User Session

```
[Logged Out]
   |
   v
[Logging In]
   |
   v
[Active Session]
   |
   v
[Session Expired/Logged Out]
```

- **Logged Out**: No session token
- **Logging In**: Credentials submitted, session being created
- **Active Session**: User authenticated, session valid
- **Session Expired/Logged Out**: Session token removed or expired