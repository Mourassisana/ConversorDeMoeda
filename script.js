async function buscarCotacao(moedaOrigem, moedaDestino) {
    const apiKey = "9927b2da07cd60212aefe92d";
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${moedaOrigem}`;

    try {
        let response = await fetch(url);
        let data = await response.json();

        if (data.conversion_rates && data.conversion_rates[moedaDestino]) {
            return data.conversion_rates[moedaDestino]; // Retorna a taxa real
        } else {
            throw new Error("Moeda não encontrada!");
        }
    } catch (error) {
        console.error("Erro ao buscar cotação:", error);
        return 1; // Retorna 1 para evitar erro na multiplicação
    }
}

async function converterMoeda() {
    let moedaOrigem = document.getElementById("moedaOrigem").value;
    let moedaDestino = document.getElementById("moedaDestino").value;
    let valor = parseFloat(document.getElementById("valor").value);

    if (isNaN(valor) || valor <= 0) {
        Swal.fire("Erro", "Digite um valor válido!", "error");
        return;
    }

    let cotacao = await buscarCotacao(moedaOrigem, moedaDestino);
    let resultado = valor * cotacao;

    // Aqui você corrige o uso do número para formatar a variável "resultado"
    let numeroFormatado = resultado.toLocaleString('pt-BR', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    Swal.fire({
        title: "Conversão Concluída!",
        text: `${moedaOrigem} ${valor} = ${moedaDestino} ${numeroFormatado}`,
        icon: "success"
    });
}
