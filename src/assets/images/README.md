# Assets Images Folder

## Logo Setup

1. Upload your logo PNG file here and name it `logo.png`
2. Once uploaded, update `src/components/shared/Logo.tsx`:
   - Uncomment the import line: `import logoImage from "../../assets/images/logo.png";`
   - Remove or comment out: `const logoImage: string | undefined = undefined;`

The logo will automatically appear in:
- Sidebar (when expanded and collapsed)
- Login/Auth page

The component includes a fallback icon that displays until the logo is uploaded.

