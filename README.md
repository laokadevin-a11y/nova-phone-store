# NOVA X1 landing page

## Run locally

From `E:\thử nghiệm`, run:

```powershell
powershell -ExecutionPolicy Bypass -File .\phone-ad\start.ps1
```

Then open [http://127.0.0.1:4173](http://127.0.0.1:4173).

The project now initializes a local SQLite database at `nova.db` automatically. Open the administration area at [http://127.0.0.1:4173/admin.html](http://127.0.0.1:4173/admin.html) to add, edit, and delete products, then review orders and support requests.

The administration area is private. Admin can sign in from the normal [login page](http://127.0.0.1:4173/login.html) with `admin@gmail.com` / `123456` and will be redirected to the management interface automatically. The separate [admin login page](http://127.0.0.1:4173/admin-login.html) is also available. The server protects the management APIs with an 8-hour session cookie. For a different password, set `NOVA_ADMIN_USER` and `NOVA_ADMIN_PASSWORD` before starting the server.

The customer order form and NOVA Care support form save data through the local JSON API. Registered accounts are stored in the `customers` table with hashed passwords and can be viewed in the `Tài khoản` tab of the admin page. The main API routes are `/api/products`, `/api/orders`, `/api/support`, `/api/register`, `/api/login`, and `/api/customers`.

To use another port:

```powershell
powershell -ExecutionPolicy Bypass -File .\phone-ad\start.ps1 -Port 8081
```

Stop the server with `Ctrl+C` in the terminal.
