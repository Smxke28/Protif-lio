import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Card from './Card';

describe('<Card />', () => {
  it('renderiza título, descrição e badges', () => {
    render(<Card title="Montagem de PC" description="Do orçamento ao setup" badges={['NVIDIA', 'AMD']} />);

    expect(screen.getByRole('heading', { name: 'Montagem de PC' })).toBeInTheDocument();
    expect(screen.getByText('Do orçamento ao setup')).toBeInTheDocument();
    expect(screen.getByText('NVIDIA')).toBeInTheDocument();
    expect(screen.getByText('AMD')).toBeInTheDocument();
  });

  it('não renderiza a lista de badges quando nenhuma é passada', () => {
    render(<Card title="Sem badges" />);
    expect(screen.queryByText('NVIDIA')).not.toBeInTheDocument();
  });

  it('envolve o conteúdo em um link quando "href" é passado', () => {
    render(<Card title="Ir para contato" href="/contato" />);
    const link = screen.getByRole('link', { name: 'Ir para contato' });
    expect(link).toHaveAttribute('href', '/contato');
  });

  it('não renderiza nenhum link quando "href" não é passado', () => {
    render(<Card title="Sem link" />);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});
