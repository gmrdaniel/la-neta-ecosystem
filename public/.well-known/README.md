# Rutas .well-known

## MTA-STS (varios dominios, mismo archivo)

El archivo `mta-sts.txt` debe ser accesible con este formato por cada dominio:

- `https://mta-sts.laneta.com/.well-known/mta-sts.txt`
- `https://mta-sts.lanetapro.com/.well-known/mta-sts.txt`
- (y cualquier otro `https://mta-sts.<tudominio>/.well-known/mta-sts.txt`)

### Un solo archivo para todos

1. **Un solo archivo:** Mantén `public/.well-known/mta-sts.txt` con la política (MX, mode, etc.). Ese mismo contenido se usará para todos los dominios.

2. **Dominios en Vercel:** En el proyecto de Vercel, añade cada subdominio como dominio:
   - `mta-sts.laneta.com`
   - `mta-sts.lanetapro.com`
   - (y los que se tengas)

3. **DNS en GoDaddy (por cada dominio):**
   - Crea un registro **CNAME**: nombre `mta-sts` → valor el que indique Vercel (ej. `cname.vercel-dns.com` o el dominio de tu proyecto).
   - Crea el registro **TXT** para MTA-STS: nombre `_mta-sts` → valor `v=STSv1; id=YYYYMMDDHHMMSS` (cambia el `id` cuando actualices la política).

Así, todas las URLs `https://mta-sts.<cualquier-dominio>/.well-known/mta-sts.txt` apuntan al mismo deploy y sirven el mismo `mta-sts.txt`.

### Contenido de mta-sts.txt

Edita `public/.well-known/mta-sts.txt` y sustituye los MX por los servidores de correo reales de cada dominio (si usas el mismo proveedor para todos, la misma lista de MX suele valer).
