# Registro BIMI (sin VMC por ahora)

El logo está disponible en:

- **https://laneta.com/logo_laneta.svg**
- **https://lanetapro.com/logo_laneta.svg**  
  (y en cualquier otro dominio que se tenga)

---

## Registro DNS en GoDaddy (por cada dominio)

En GoDaddy, para **cada dominio** (laneta.com, lanetapro.com, etc.):

1. Entra en **DNS** del dominio.
2. Añade un registro **TXT**:
   - **Nombre / Host:** `default._bimi` (en algunos paneles solo `default._bimi`; si pide “subdominio”, deja el nombre del dominio en blanco o usa `@` y el sistema suele completar `default._bimi.<tudominio>`).
   - **Valor:** (usa la línea que corresponda al dominio)

### Para laneta.com
```text
v=BIMI1; l=https://laneta.com/logo_laneta.svg
```

### Para lanetapro.com
```text
v=BIMI1; l=https://lanetapro.com/logo_laneta.svg
```

Para otros dominios, usa el mismo formato cambiando la URL:  
`v=BIMI1; l=https://<tudominio>/logo_laneta.svg`

---

**Nota:** Muchos proveedores (p. ej. Gmail) solo muestran el logo BIMI si hay VMC válido. Sin VMC el registro ya queda listo y se puede añadir `a=` cuando se tenga el certificado.
