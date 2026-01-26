# UI Component Library Documentation

Dokumentasi lengkap untuk koleksi komponen UI yang siap pakai dengan Tailwind CSS dan TypeScript.

## 📦 Instalasi

Semua komponen sudah tersedia di folder `components/ui/`. Import komponen yang diperlukan:

```tsx
import { Button, Input, Card } from '@/components/ui';
```

## 🎨 Komponen

### 1. Button

Tombol dengan berbagai variant dan ukuran.

#### Props

| Prop | Type | Default | Deskripsi |
|------|------|---------|-----------|
| `variant` | `'primary' \| 'secondary' \| 'danger' \| 'success' \| 'outline' \| 'ghost'` | `'primary'` | Gaya tombol |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Ukuran tombol |
| `fullWidth` | `boolean` | `false` | Tombol full width |
| `isLoading` | `boolean` | `false` | Tampilkan loading spinner |
| `leftIcon` | `ReactNode` | - | Icon di sebelah kiri |
| `rightIcon` | `ReactNode` | - | Icon di sebelah kanan |

#### Contoh Penggunaan

```tsx
import { Button } from '@/components/ui';

// Basic
<Button>Click Me</Button>

// Dengan variant
<Button variant="danger">Delete</Button>
<Button variant="outline">Cancel</Button>

// Dengan ukuran
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>

// Dengan icon
<Button leftIcon={<PlusIcon />}>Add Item</Button>

// Loading state
<Button isLoading>Saving...</Button>

// Full width
<Button fullWidth>Submit</Button>
```

---

### 2. Input

Input field dengan label, error, dan icon.

#### Props

| Prop | Type | Default | Deskripsi |
|------|------|---------|-----------|
| `label` | `string` | - | Label input |
| `error` | `string` | - | Pesan error |
| `helperText` | `string` | - | Teks bantuan |
| `leftIcon` | `ReactNode` | - | Icon di kiri input |
| `rightIcon` | `ReactNode` | - | Icon di kanan input |
| `fullWidth` | `boolean` | `false` | Input full width |

#### Contoh Penggunaan

```tsx
import { Input } from '@/components/ui';

// Basic
<Input placeholder="Enter text" />

// Dengan label
<Input label="Email" type="email" placeholder="your@email.com" />

// Dengan error
<Input 
  label="Password" 
  type="password" 
  error="Password must be at least 8 characters" 
/>

// Dengan helper text
<Input 
  label="Username" 
  helperText="Choose a unique username" 
/>

// Dengan icon
<Input 
  placeholder="Search..." 
  leftIcon={<SearchIcon />} 
/>

// Full width
<Input fullWidth label="Full Name" />
```

---

### 3. Textarea

Text area untuk input multi-line.

#### Props

| Prop | Type | Default | Deskripsi |
|------|------|---------|-----------|
| `label` | `string` | - | Label textarea |
| `error` | `string` | - | Pesan error |
| `helperText` | `string` | - | Teks bantuan |
| `rows` | `number` | `4` | Jumlah baris |
| `fullWidth` | `boolean` | `false` | Textarea full width |

#### Contoh Penggunaan

```tsx
import { Textarea } from '@/components/ui';

<Textarea 
  label="Description" 
  placeholder="Enter description" 
  rows={6} 
/>

<Textarea 
  label="Message" 
  error="Message is required" 
/>
```

---

### 4. Select

Dropdown select input.

#### Props

| Prop | Type | Default | Deskripsi |
|------|------|---------|-----------|
| `label` | `string` | - | Label select |
| `error` | `string` | - | Pesan error |
| `helperText` | `string` | - | Teks bantuan |
| `options` | `Array<{value: string, label: string}>` | **Required** | Daftar opsi |
| `fullWidth` | `boolean` | `false` | Select full width |

#### Contoh Penggunaan

```tsx
import { Select } from '@/components/ui';

<Select 
  label="Country"
  options={[
    { value: '', label: 'Select country' },
    { value: 'id', label: 'Indonesia' },
    { value: 'my', label: 'Malaysia' },
  ]}
/>
```

---

### 5. Checkbox

Checkbox input dengan label.

#### Props

| Prop | Type | Default | Deskripsi |
|------|------|---------|-----------|
| `label` | `string` | - | Label checkbox |
| `error` | `string` | - | Pesan error |

#### Contoh Penggunaan

```tsx
import { Checkbox } from '@/components/ui';

<Checkbox label="Accept terms and conditions" />

<Checkbox 
  label="Subscribe to newsletter" 
  defaultChecked 
/>
```

---

### 6. Radio

Radio button input.

#### Props

| Prop | Type | Default | Deskripsi |
|------|------|---------|-----------|
| `label` | `string` | - | Label radio |
| `error` | `string` | - | Pesan error |

#### Contoh Penggunaan

```tsx
import { Radio } from '@/components/ui';

const [value, setValue] = useState('option1');

<Radio 
  name="option" 
  label="Option 1" 
  value="option1"
  checked={value === 'option1'}
  onChange={(e) => setValue(e.target.value)}
/>
<Radio 
  name="option" 
  label="Option 2" 
  value="option2"
  checked={value === 'option2'}
  onChange={(e) => setValue(e.target.value)}
/>
```

---

### 7. Card

Container card dengan header, body, dan footer.

#### Card Props

| Prop | Type | Default | Deskripsi |
|------|------|---------|-----------|
| `variant` | `'default' \| 'bordered' \| 'elevated'` | `'default'` | Gaya card |
| `padding` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Padding card |
| `hover` | `boolean` | `false` | Hover effect |

#### Contoh Penggunaan

```tsx
import { Card, CardHeader, CardTitle, CardBody, CardFooter } from '@/components/ui';

<Card variant="elevated" hover>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardBody>
    Card content goes here
  </CardBody>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

---

### 8. Badge

Badge untuk label atau status.

#### Props

| Prop | Type | Default | Deskripsi |
|------|------|---------|-----------|
| `variant` | `'primary' \| 'secondary' \| 'success' \| 'danger' \| 'warning' \| 'info'` | `'primary'` | Warna badge |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Ukuran badge |
| `dot` | `boolean` | `false` | Tampilkan dot indicator |

#### Contoh Penggunaan

```tsx
import { Badge } from '@/components/ui';

<Badge variant="success">Active</Badge>
<Badge variant="danger">Error</Badge>
<Badge variant="warning" size="sm">Pending</Badge>
<Badge variant="success" dot>Online</Badge>
```

---

### 9. Alert

Alert box untuk notifikasi.

#### Props

| Prop | Type | Default | Deskripsi |
|------|------|---------|-----------|
| `variant` | `'info' \| 'success' \| 'warning' \| 'danger'` | `'info'` | Tipe alert |
| `title` | `string` | - | Judul alert |
| `onClose` | `() => void` | - | Handler untuk close button |

#### Contoh Penggunaan

```tsx
import { Alert } from '@/components/ui';

<Alert variant="success" title="Success!">
  Your changes have been saved.
</Alert>

<Alert variant="danger" title="Error" onClose={() => console.log('closed')}>
  Something went wrong.
</Alert>

<Alert variant="warning">
  Please review your information.
</Alert>
```

---

### 10. Modal

Modal dialog dengan backdrop.

#### Props

| Prop | Type | Default | Deskripsi |
|------|------|---------|-----------|
| `isOpen` | `boolean` | **Required** | Status modal terbuka |
| `onClose` | `() => void` | **Required** | Handler untuk close |
| `title` | `string` | - | Judul modal |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Ukuran modal |
| `showCloseButton` | `boolean` | `true` | Tampilkan tombol close |

#### Contoh Penggunaan

```tsx
import { Modal, ModalFooter } from '@/components/ui';

const [isOpen, setIsOpen] = useState(false);

<Modal 
  isOpen={isOpen} 
  onClose={() => setIsOpen(false)}
  title="Confirm Action"
  size="md"
>
  <p>Are you sure you want to continue?</p>
  
  <ModalFooter>
    <Button variant="ghost" onClick={() => setIsOpen(false)}>
      Cancel
    </Button>
    <Button onClick={handleConfirm}>
      Confirm
    </Button>
  </ModalFooter>
</Modal>
```

**Features:**
- ESC key untuk close
- Click backdrop untuk close
- Scroll lock saat modal terbuka

---

### 11. Dropdown

Dropdown menu dengan items.

#### Dropdown Props

| Prop | Type | Default | Deskripsi |
|------|------|---------|-----------|
| `trigger` | `ReactNode` | **Required** | Element trigger |
| `align` | `'left' \| 'right'` | `'left'` | Alignment dropdown |

#### DropdownItem Props

| Prop | Type | Default | Deskripsi |
|------|------|---------|-----------|
| `icon` | `ReactNode` | - | Icon item |
| `onClick` | `() => void` | - | Handler click |
| `danger` | `boolean` | `false` | Danger styling |

#### Contoh Penggunaan

```tsx
import { Dropdown, DropdownItem, DropdownDivider } from '@/components/ui';

<Dropdown 
  trigger={<Button>Menu</Button>}
  align="right"
>
  <DropdownItem 
    icon={<EditIcon />}
    onClick={() => console.log('Edit')}
  >
    Edit
  </DropdownItem>
  <DropdownItem 
    icon={<ShareIcon />}
    onClick={() => console.log('Share')}
  >
    Share
  </DropdownItem>
  <DropdownDivider />
  <DropdownItem 
    danger 
    onClick={() => console.log('Delete')}
  >
    Delete
  </DropdownItem>
</Dropdown>
```

**Features:**
- Click outside untuk close
- Auto positioning

---

### 12. Spinner

Loading spinner.

#### Props

| Prop | Type | Default | Deskripsi |
|------|------|---------|-----------|
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Ukuran spinner |
| `color` | `'primary' \| 'white' \| 'gray'` | `'primary'` | Warna spinner |

#### Contoh Penggunaan

```tsx
import { Spinner } from '@/components/ui';

<Spinner size="md" />
<Spinner size="lg" color="white" />

// Dalam button
<Button disabled>
  <Spinner size="sm" color="white" />
  Loading...
</Button>
```

---

## 🎯 Best Practices

### 1. Form Validation

```tsx
const [errors, setErrors] = useState({});

<Input 
  label="Email"
  error={errors.email}
  {...register('email')}
/>
```

### 2. Kombinasi Komponen

```tsx
<Card>
  <CardHeader>
    <div className="flex items-center justify-between">
      <CardTitle>User Profile</CardTitle>
      <Badge variant="success">Active</Badge>
    </div>
  </CardHeader>
  <CardBody>
    <Input label="Name" />
    <Input label="Email" type="email" />
  </CardBody>
  <CardFooter>
    <Button fullWidth>Save Changes</Button>
  </CardFooter>
</Card>
```

### 3. Accessibility

Semua komponen sudah mendukung:
- ✅ Keyboard navigation
- ✅ ARIA labels
- ✅ Focus states
- ✅ Screen reader friendly

---

## 🔗 Demo & Showcase

Lihat semua komponen dalam action:

**URL:** `/components`

Atau jalankan dev server:
```bash
npm run dev
```

Kemudian buka: `http://localhost:3000/components`

---

## 📝 TypeScript Support

Semua komponen memiliki TypeScript types yang lengkap:

```tsx
import type { ButtonProps, InputProps, CardProps } from '@/components/ui';

const CustomButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />;
};
```

---

## 🎨 Customization

### Extend Styles

Gunakan `className` prop untuk customization:

```tsx
<Button className="shadow-2xl hover:scale-105">
  Custom Button
</Button>

<Card className="border-2 border-blue-500">
  Custom Card
</Card>
```

### Custom Variants

Tambahkan variant baru di komponen:

```tsx
// components/ui/Button.tsx
const variants = {
  // ... existing variants
  custom: 'bg-purple-600 text-white hover:bg-purple-700',
};
```

---

## 📦 Export

Semua komponen di-export dari `components/ui/index.ts`:

```tsx
// Import individual
import { Button } from '@/components/ui/Button';

// Import multiple
import { Button, Input, Card } from '@/components/ui';

// Import all
import * as UI from '@/components/ui';
```

---

## 🛠️ Development

### File Structure

```
components/
└── ui/
    ├── Alert.tsx
    ├── Badge.tsx
    ├── Button.tsx
    ├── Card.tsx
    ├── Checkbox.tsx
    ├── Dropdown.tsx
    ├── Input.tsx
    ├── Label.tsx
    ├── Modal.tsx
    ├── Radio.tsx
    ├── Select.tsx
    ├── Spinner.tsx
    ├── Textarea.tsx
    ├── index.ts
    └── README.md
```

### Menambah Komponen Baru

1. Buat file komponen di `components/ui/`
2. Export dari `index.ts`
3. Tambahkan dokumentasi di README
4. Update showcase page

---

## 🎉 Happy Coding!

Dokumentasi ini akan terus diupdate seiring penambahan komponen baru.

**Lihat juga:**
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
