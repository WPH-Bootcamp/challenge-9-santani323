'use client';

import React, { useState } from 'react';
import {
  Button,
  Input,
  Textarea,
  Select,
  Checkbox,
  Radio,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardFooter,
  Badge,
  Alert,
  Modal,
  ModalFooter,
  Dropdown,
  DropdownItem,
  DropdownDivider,
  Spinner,
} from '@/components/ui';

export default function ComponentShowcase() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRadio, setSelectedRadio] = useState('option1');

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            UI Component Library
          </h1>
          <p className="text-xl text-gray-600">
            Koleksi lengkap komponen UI yang siap pakai
          </p>
        </div>

        {/* Buttons */}
        <Card>
          <CardHeader>
            <CardTitle>Buttons</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="success">Success</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
            <div className="flex flex-wrap gap-4 mt-4">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
            <div className="flex flex-wrap gap-4 mt-4">
              <Button isLoading>Loading</Button>
              <Button disabled>Disabled</Button>
              <Button
                leftIcon={
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                  </svg>
                }
              >
                With Icon
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* Inputs */}
        <Card>
          <CardHeader>
            <CardTitle>Inputs & Forms</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Email"
                type="email"
                placeholder="Enter your email"
                helperText="We'll never share your email"
              />
              <Input
                label="Password"
                type="password"
                placeholder="Enter password"
                error="Password is required"
              />
              <Input
                label="Search"
                placeholder="Search..."
                leftIcon={
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                }
              />
              <Select
                label="Country"
                options={[
                  { value: '', label: 'Select country' },
                  { value: 'id', label: 'Indonesia' },
                  { value: 'my', label: 'Malaysia' },
                  { value: 'sg', label: 'Singapore' },
                ]}
              />
              <div className="md:col-span-2">
                <Textarea
                  label="Message"
                  placeholder="Enter your message"
                  rows={4}
                />
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Checkboxes & Radio */}
        <Card>
          <CardHeader>
            <CardTitle>Checkbox & Radio</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Checkboxes</h4>
                <div className="space-y-2">
                  <Checkbox label="Accept terms and conditions" />
                  <Checkbox label="Subscribe to newsletter" />
                  <Checkbox label="Remember me" />
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Radio Buttons</h4>
                <div className="space-y-2">
                  <Radio
                    name="option"
                    label="Option 1"
                    value="option1"
                    checked={selectedRadio === 'option1'}
                    onChange={(e) => setSelectedRadio(e.target.value)}
                  />
                  <Radio
                    name="option"
                    label="Option 2"
                    value="option2"
                    checked={selectedRadio === 'option2'}
                    onChange={(e) => setSelectedRadio(e.target.value)}
                  />
                  <Radio
                    name="option"
                    label="Option 3"
                    value="option3"
                    checked={selectedRadio === 'option3'}
                    onChange={(e) => setSelectedRadio(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Badges */}
        <Card>
          <CardHeader>
            <CardTitle>Badges</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="flex flex-wrap gap-3">
              <Badge variant="primary">Primary</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="danger">Danger</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="info">Info</Badge>
            </div>
            <div className="flex flex-wrap gap-3 mt-4">
              <Badge size="sm">Small</Badge>
              <Badge size="md">Medium</Badge>
              <Badge size="lg">Large</Badge>
            </div>
            <div className="flex flex-wrap gap-3 mt-4">
              <Badge dot variant="success">Active</Badge>
              <Badge dot variant="warning">Pending</Badge>
              <Badge dot variant="danger">Error</Badge>
            </div>
          </CardBody>
        </Card>

        {/* Alerts */}
        <div className="space-y-4">
          <Alert variant="info" title="Information">
            This is an informational alert with some additional details.
          </Alert>
          <Alert variant="success" title="Success!">
            Your changes have been saved successfully.
          </Alert>
          <Alert variant="warning" title="Warning">
            Please review your information before submitting.
          </Alert>
          <Alert variant="danger" title="Error" onClose={() => alert('Alert closed')}>
            Something went wrong. Please try again.
          </Alert>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card variant="default" hover>
            <CardHeader>
              <CardTitle>Default Card</CardTitle>
            </CardHeader>
            <CardBody>
              This is a default card with hover effect.
            </CardBody>
            <CardFooter>
              <Button size="sm" fullWidth>
                Action
              </Button>
            </CardFooter>
          </Card>

          <Card variant="bordered" hover>
            <CardHeader>
              <CardTitle>Bordered Card</CardTitle>
            </CardHeader>
            <CardBody>
              This card has a thicker border.
            </CardBody>
            <CardFooter>
              <Button size="sm" variant="outline" fullWidth>
                Action
              </Button>
            </CardFooter>
          </Card>

          <Card variant="elevated" hover>
            <CardHeader>
              <CardTitle>Elevated Card</CardTitle>
            </CardHeader>
            <CardBody>
              This card has a shadow effect.
            </CardBody>
            <CardFooter>
              <Button size="sm" variant="secondary" fullWidth>
                Action
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Modal & Dropdown */}
        <Card>
          <CardHeader>
            <CardTitle>Modal & Dropdown</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="flex gap-4">
              <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
              
              <Dropdown
                trigger={
                  <Button variant="outline">
                    Dropdown Menu
                    <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Button>
                }
              >
                <DropdownItem
                  icon={
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                  }
                  onClick={() => alert('Edit clicked')}
                >
                  Edit
                </DropdownItem>
                <DropdownItem
                  icon={
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                  }
                  onClick={() => alert('Share clicked')}
                >
                  Share
                </DropdownItem>
                <DropdownDivider />
                <DropdownItem danger onClick={() => alert('Delete clicked')}>
                  Delete
                </DropdownItem>
              </Dropdown>
            </div>
          </CardBody>
        </Card>

        {/* Spinner */}
        <Card>
          <CardHeader>
            <CardTitle>Spinners</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="flex items-center gap-8">
              <div className="text-center">
                <Spinner size="sm" />
                <p className="text-sm mt-2">Small</p>
              </div>
              <div className="text-center">
                <Spinner size="md" />
                <p className="text-sm mt-2">Medium</p>
              </div>
              <div className="text-center">
                <Spinner size="lg" />
                <p className="text-sm mt-2">Large</p>
              </div>
              <div className="text-center">
                <Spinner size="xl" />
                <p className="text-sm mt-2">Extra Large</p>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Example Modal"
          size="md"
        >
          <div className="space-y-4">
            <p className="text-gray-600">
              This is an example modal dialog. You can put any content here.
            </p>
            <Input
              label="Name"
              placeholder="Enter your name"
            />
            <Textarea
              label="Description"
              placeholder="Enter description"
              rows={3}
            />
          </div>
          <ModalFooter>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsModalOpen(false)}>
              Save Changes
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
}
