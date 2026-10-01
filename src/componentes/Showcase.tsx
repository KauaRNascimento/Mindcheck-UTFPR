import { useState } from "react";
import { Button, IconButton } from "./Button";
import { Input, Textarea, Checkbox, RadioGroup } from "./Field";
import { Card, CardHeader } from "./Card";
import { Badge } from "./Badge";
import { Modal, Drawer } from "./Overlay";
import { Alert, ToastProvider, useToast } from "./Feedback";
import { ProgressBar, Spinner } from "./Progress";
import { EmptyState, ErrorState } from "./StatusState";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section data-component="showcase-section">
      <h2>{title}</h2>
      <div data-component="showcase-content">{children}</div>
    </section>
  );
}

function ToastDemoButton() {
  const { showToast } = useToast();
  return (
    <Button variant="secondary" onClick={() => showToast("Toast demonstrativo.", "success")}>
      Mostrar toast
    </Button>
  );
}

export default function Showcase() {
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [radioValue, setRadioValue] = useState("sono");

  return (
    <ToastProvider>
      <main data-component="showcase">
        <h1>Showcase de componentes</h1>
        <p>
          Demonstração dos componentes disponíveis para aplicação visual posterior.
        </p>

        <Section title="Botão">
          <Button>Botão</Button>
          <Button variant="secondary">Botão secundário</Button>
          <Button variant="ghost">Botão ghost</Button>
          <Button variant="danger">Botão de perigo</Button>
          <Button disabled>Botão desabilitado</Button>
          <Button loading>Botão carregando</Button>
          <Button size="sm">Botão pequeno</Button>
          <Button size="lg">Botão grande</Button>
          <IconButton aria-label="Botão de ícone" icon={<span aria-hidden="true">＋</span>} />
        </Section>

        <Section title="Campos de formulário">
          <div>
            <Input label="Campo de texto" placeholder="Digite um valor" required />
            <Input label="Campo com ajuda" helperText="Texto auxiliar" />
            <Input label="Campo com erro" defaultValue="Valor inválido" errorMessage="Mensagem de erro." />
            <Input label="Campo desabilitado" disabled defaultValue="Não editável" />
            <Textarea label="Área de texto" placeholder="Digite um texto..." helperText="Texto auxiliar" />
            <Checkbox label="Caixa de seleção" required />
            <RadioGroup
              name="radio-demo"
              legend="Grupo de opções"
              value={radioValue}
              onChange={setRadioValue}
              options={[
                { value: "opcao-1", label: "Opção 1" },
                { value: "opcao-2", label: "Opção 2" },
                { value: "opcao-3", label: "Opção 3" },
              ]}
            />
          </div>
        </Section>

        <Section title="Card">
          <Card>
            <CardHeader title="Título do card" subtitle="Subtítulo do card" action={<Badge tone="success">Badge</Badge>} />
            <p>
              Conteúdo demonstrativo do card.
            </p>
          </Card>
          <Card onClick={() => alert("Card clicado")}>
            <CardHeader title="Card interativo" subtitle="Card clicável" action={<Badge tone="warning">Badge</Badge>} />
            <p>Ative a interação clicando neste card.</p>
          </Card>
        </Section>

        <Section title="Badge">
          <Badge tone="neutral">Badge neutro</Badge>
          <Badge tone="primary">Badge primário</Badge>
          <Badge tone="success">Badge de sucesso</Badge>
          <Badge tone="warning">Badge de aviso</Badge>
          <Badge tone="error">Badge de erro</Badge>
        </Section>

        <Section title="Modal / Drawer">
          <Button onClick={() => setModalOpen(true)}>Abrir modal</Button>
          <Button variant="secondary" onClick={() => setDrawerOpen(true)}>
            Abrir drawer
          </Button>
          <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Modal">
            <p>Conteúdo demonstrativo do modal.</p>
          </Modal>
          <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="Drawer">
            <p>Conteúdo demonstrativo do drawer.</p>
          </Drawer>
        </Section>

        <Section title="Toast / Alert">
          <ToastDemoButton />
          <div>
            <Alert tone="info" title="Alert informativo" description="Descrição do alert." />
            <Alert tone="warning" title="Alert de aviso" onDismiss={() => {}} />
            <Alert tone="error" title="Alert de erro" description="Descrição do erro." />
          </div>
        </Section>

        <Section title="Progresso / Loading">
          <div>
            <ProgressBar value={3} max={9} label="Progresso" />
          </div>
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" />
        </Section>

        <Section title="Empty / Error state">
          <div>
            <EmptyState title="Estado vazio" description="Descrição do estado vazio." actionLabel="Ação" onAction={() => {}} />
          </div>
          <div>
            <ErrorState title="Estado de erro" description="Descrição do estado de erro." actionLabel="Tentar novamente" onAction={() => {}} />
          </div>
        </Section>
      </main>
    </ToastProvider>
  );
}
