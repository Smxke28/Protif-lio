export default function SobrePage() {
  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
        Sobre Mim
      </h1>

      {/* Resumo */}
      <section className="mb-10">
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          Sou <strong>Juan Lavecchia Coelho da Silva</strong>, estudante de Ciências da Computação
          (8º período na Universidade Estácio de Sá) e profissional com experiência em
          manutenção de computadores, suporte técnico e desenvolvimento de soluções em TI.
          E também já fiz parte na liderança de equipe e análise de dados na área de
          prevenção de perdas, como Chefe.
        </p>
      </section>

      {/* Formação Acadêmica */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
          Formação Acadêmica
        </h2>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
          <li>Bacharelado em Ciências da Computação - Universidade Estácio de Sá (Juiz de Fora, MG)</li>
        </ul>
      </section>

      {/* Experiência Profissional */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
          Experiência Profissional
        </h2>
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <div>
            <h3 className="font-bold">Manutenção e Suporte Técnico em Informática - Autônomo (2016 - Atual)</h3>
            <p>8 anos de experiência em montagem, manutenção preventiva e corretiva de computadores, instalação de sistemas e suporte a redes locais.</p>
          </div>
          <div>
            <h3 className="font-bold">Técnico em Eletrônica - Telemaq (Set/2022 - Out/2022)</h3>
            <p>Suporte técnico e manutenção de equipamentos eletrônicos, reparos e testes de funcionamento.</p>
          </div>
          <div>
            <h3 className="font-bold">Chefe de Prevenção de Perdas - Bahamas (Out/2024 - 2025)</h3>
            <p>Liderança de equipe, análise de dados e gestão de processos internos.</p>
          </div>
          <div>
            <h3 className="font-bold">Prevenção de Perdas / Estoquista / Operador de Terminal - Bahamas (Mai/2023 - 2024)</h3>
            <p>Operação de sistemas internos, apoio logístico e contato com softwares de gestão.</p>
          </div>
        </div>
      </section>

      {/* Habilidades Técnicas */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
          Habilidades Técnicas
        </h2>
        <ul className="grid grid-cols-2 gap-2 text-gray-700 dark:text-gray-300">
          <li>Python, Java, C, SQL, JavaScript</li>
          <li>HTML, CSS, PHP, Node.js</li>
          <li>MySQL, PostgreSQL</li>
          <li>Fundamentos em AWS</li>
          <li>Git/GitHub, VS Code</li>
          <li>Linux/Windows</li>
        </ul>
      </section>

      {/* Cursos e Certificações */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
          Cursos e Certificações
        </h2>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
          <li>Programador de Sistemas - Senac (2022)</li>
          <li>AWS Discovery Day - Computação em Nuvem (2023)</li>
          <li>Programação para Internet - Estácio (2023)</li>
          <li>Programação de Sistemas de Informação - Estácio (2024)</li>
          <li>Concepção de Algoritmos Eficientes - Estácio (2024)</li>
          <li>Análise e Solução de Problemas Complexos - Estácio (2024)</li>
          <li>Gerência da Informação - Estácio (2023)</li>
        </ul>
      </section>

      {/* Idiomas */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
          Idiomas
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          Inglês (Pré-intermediário) · Francês (Intermediário)
        </p>
      </section>

      {/* Projetos */}
      <section>
        <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
          Projetos de TI
        </h2>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
          <li>Sistema de Cadastro de Usuários em Python com integração MySQL</li>
          <li>Página Web Pessoal desenvolvida em HTML, CSS e JavaScript</li>
          <li>Inclindo esse Prototipo de site</li>
        </ul>
      </section>
    </div>
  );
}
