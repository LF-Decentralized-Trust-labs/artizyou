# Keys Directory

This directory contains sensitive credential files that should **NEVER** be committed to version control.

## Files

### `keyfile.json` - Google Cloud Service Account Key

This file contains the private key for authenticating with Google Cloud services (Vision API, etc.).

**How to obtain:**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Navigate to **IAM & Admin** → **Service Accounts**
4. Create or select an existing service account
5. Click **Keys** → **Add Key** → **Create new key**
6. Choose **JSON** format
7. Download and save as `keyfile.json` in this directory

**Required permissions:**
- Cloud Vision API access
- Any other Google Cloud APIs your application uses

### Other credential files

Place any other sensitive credential files in this directory:
- SSL certificates (`.pem`, `.crt`, `.key`)
- SSH keys
- Other service account keys
- Encryption keys

## Security

⚠️ **IMPORTANT SECURITY NOTES:**

1. **Never commit these files to Git** - They are already in `.gitignore`
2. **Rotate keys immediately** if accidentally exposed
3. **Use environment-specific keys** - Different keys for dev/staging/production
4. **Restrict permissions** - `chmod 600` for sensitive files
5. **Use secret management** in production (AWS Secrets Manager, etc.)

## Environment Variable

The path to `keyfile.json` is configured in `.env`:

```
GOOGLE_CLOUD_KEYFILE_PATH=config/keys/keyfile.json
```

## Setup Instructions

1. Copy your `keyfile.json` to this directory
2. Ensure file permissions are restrictive: `chmod 600 keyfile.json`
3. Verify the path in your `.env` file matches the location
4. **Never commit this file to version control**

## Production Deployment

For production environments, consider:

1. **Using environment variables** with base64-encoded JSON:
   ```bash
   export GOOGLE_CLOUD_KEYFILE_JSON="$(cat keyfile.json | base64)"
   ```

2. **Using cloud secret managers:**
   - AWS Secrets Manager
   - Google Cloud Secret Manager
   - HashiCorp Vault
   - Azure Key Vault

3. **Using workload identity** (for Kubernetes/GKE deployments)
