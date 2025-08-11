import React from 'react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto w-full pl-4 sm:pl-6 lg:pl-8 pr-4 sm:pr-6 lg:pr-8 py-16">
        <div className="bg-gray-900 rounded-lg shadow-lg p-8 border border-gray-800">
          <h2 className="text-2xl font-bold text-white mb-6">Sobre a Tiger Motos</h2>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-300 mb-6">
              Bem-vindo à Tiger Motos, seu destino principal para motocicletas de qualidade. Especializamo-nos em 
              fornecer uma seleção curada de motocicletas que combinam desempenho, estilo e confiabilidade.
            </p>
            
            <h3 className="text-xl font-semibold text-white mb-4">Nossa Missão</h3>
            <p className="text-gray-300 mb-6">
              Na Tiger Motos, somos apaixonados por motocicletas e comprometidos em ajudar os pilotos a encontrar 
              sua máquina perfeita. Seja você um piloto experiente ou apenas começando sua jornada, 
              temos a expertise e o inventário para atender às suas necessidades.
            </p>
            
            <h3 className="text-xl font-semibold text-white mb-4">O que Oferecemos</h3>
            <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
              <li>Motocicletas usadas cuidadosamente selecionadas</li>
              <li>Inspeções abrangentes de veículos e manutenção</li>
              <li>Preços transparentes e opções de financiamento</li>
              <li>Conselhos especializados e suporte ao cliente</li>
              <li>Garantia e serviço pós-venda</li>
            </ul>
            
            <h3 className="text-xl font-semibold text-white mb-4">Nosso Compromisso</h3>
            <p className="text-gray-300 mb-6">
              Acreditamos em construir relacionamentos duradouros com nossos clientes através da honestidade, 
              transparência e serviço excepcional. Cada motocicleta em nosso inventário passa por 
              uma inspeção rigorosa para garantir que atenda aos nossos altos padrões.
            </p>
            
            <div className="bg-gray-800 rounded-lg p-6 mt-8 border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-3">Visite-nos</h3>
              <p className="text-gray-300 mb-2">
                <strong>Endereço:</strong> Av. Irmãos Adorno, 186 - Sítio do Campo, Praia Grande
              </p>
              <p className="text-gray-300 mb-2">
                <strong>Telefone:</strong> (13) 99103-0606
              </p>
              <p className="text-gray-300 mb-2">
                <strong>Email:</strong> contato@tigermotos.com.br
              </p>
              <p className="text-gray-300">
                <strong>Horário:</strong> Segunda - Sábado: 9:00 - 18:00
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 