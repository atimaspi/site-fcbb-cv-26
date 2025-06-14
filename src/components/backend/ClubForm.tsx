
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DialogFooter } from '@/components/ui/dialog';

interface ClubFormProps {
  onSubmit: (data: any) => Promise<void>;
  initialData?: any | null;
  onCancel: () => void;
  isSubmitting: boolean;
}

const ClubForm: React.FC<ClubFormProps> = ({ onSubmit, initialData, onCancel, isSubmitting }) => {
  const [formData, setFormData] = useState({
    name: '',
    abbreviation: '',
    city: '',
    island: '',
    status: 'ativo',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        abbreviation: initialData.abbreviation || '',
        city: initialData.city || '',
        island: initialData.island || '',
        status: initialData.status || 'ativo',
      });
    } else {
      setFormData({
        name: '',
        abbreviation: '',
        city: '',
        island: '',
        status: 'ativo',
      });
    }
  }, [initialData]);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nome do Clube *</Label>
          <Input id="name" value={formData.name} onChange={(e) => handleChange('name', e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="abbreviation">Abreviação</Label>
          <Input id="abbreviation" value={formData.abbreviation} onChange={(e) => handleChange('abbreviation', e.target.value)} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">Cidade</Label>
          <Input id="city" value={formData.city} onChange={(e) => handleChange('city', e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="island">Ilha</Label>
          <Input id="island" value={formData.island} onChange={(e) => handleChange('island', e.target.value)} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select value={formData.status} onValueChange={(value) => handleChange('status', value)}>
          <SelectTrigger id="status">
            <SelectValue placeholder="Selecione o status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ativo">Ativo</SelectItem>
            <SelectItem value="inativo">Inativo</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>Cancelar</Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Salvando...' : (initialData ? 'Salvar Alterações' : 'Criar Clube')}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default ClubForm;
