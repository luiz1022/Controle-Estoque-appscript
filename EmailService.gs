const EmailService = (() => {


  function enviarMovimentacao(tipo, dados, observacao = "") {

    try {

      if (!dados || !dados.material) return;

      const material = dados.material;

      const usuario =
        Session.getActiveUser().getEmail() || "Sistema";

      const dataHora = Utilities.formatDate(
        new Date(),
        Session.getScriptTimeZone(),
        "dd/MM/yyyy HH:mm:ss"
      );

      const assunto =
        `[Controle de Estoque] ${tipo} - ${material.codigo}`;

      

      const saldoAtual = Number(dados.saldoAtual);
      const estoqueIdeal = Number(material.quantidadeIdeal);

      let status = "";
      let corStatus = "";
      let alerta = "";

      if (saldoAtual < estoqueIdeal) {

        status = "🔴 ESTOQUE ABAIXO DO IDEAL";
        corStatus = "#D32F2F";

        alerta = `
        <div style="
          margin-top:25px;
          padding:18px;
          background:#FFF3F3;
          border-left:6px solid #D32F2F;
          border-radius:6px;
          color:#8B0000;
        ">

        <strong>Atenção!</strong>

        <br><br>

        O estoque deste material encontra-se
        abaixo da quantidade ideal.

        <br><br>

        Recomenda-se providenciar sua reposição.

        </div>
        `;

      }

      else if (saldoAtual >= (estoqueIdeal + 5)) {

        status = "🔵 ESTOQUE ACIMA DO IDEAL";
        corStatus = "#1565C0";

        alerta = `
        <div style="
          margin-top:25px;
          padding:18px;
          background:#EAF4FF;
          border-left:6px solid #1565C0;
          border-radius:6px;
          color:#0D47A1;
        ">

        <strong>Informação</strong>

        <br><br>

        Este material possui estoque superior ao ideal.

        Avalie a necessidade de redistribuição
        ou otimização do estoque.

        </div>
        `;

      }

      else {

        status = "🟢 ESTOQUE NORMAL";
        corStatus = "#2E7D32";

      }

      

      const html = `

<!DOCTYPE html>

<html>

<head>

<meta charset="UTF-8">

</head>

<body style="
margin:0;
padding:30px;
background:#EEF2F7;
font-family:Arial,Helvetica,sans-serif;
">

<table
width="720"
align="center"
style="
background:#FFFFFF;
border-radius:8px;
overflow:hidden;
border:1px solid #D9D9D9;
">

<tr>

<td
style="
background:#003B70;
padding:28px;
color:white;
">

<h2 style="margin:0;">
🚆 Metrô BH
</h2>

<div style="
margin-top:8px;
font-size:15px;
">

Sistema Corporativo de Controle de Estoque

</div>

</td>

</tr>

<tr>

<td style="padding:35px;">

<p>

Prezado(a),

</p>

<p>

Foi registrada uma movimentação no estoque.

</p>

<table
width="100%"
style="
border-collapse:collapse;
font-size:14px;
margin-top:25px;
">

<tr style="background:#F4F6F9;">

<td style="padding:12px;"><b>Operação</b></td>

<td style="padding:12px;">
${tipo}
</td>

</tr>

<tr>

<td style="padding:12px;"><b>Código</b></td>

<td style="padding:12px;">
${material.codigo}
</td>

</tr>

<tr style="background:#F4F6F9;">

<td style="padding:12px;"><b>Material</b></td>

<td style="padding:12px;">
${material.descricao}
</td>

</tr>

<tr>

<td style="padding:12px;"><b>Quantidade Movimentada</b></td>

<td style="padding:12px;">
${dados.quantidade}
</td>

</tr>

<tr style="background:#F4F6F9;">

<td style="padding:12px;"><b>Saldo Anterior</b></td>

<td style="padding:12px;">
${dados.saldoAnterior}
</td>

</tr>

<tr>

<td style="padding:12px;"><b>Saldo Atual</b></td>

<td style="padding:12px;">
<b>${dados.saldoAtual}</b>
</td>

</tr>
<tr style="background:#F4F6F9;">

<td style="padding:12px;"><b>Estoque Ideal</b></td>

<td style="padding:12px;">
${material.quantidadeIdeal}
</td>

</tr>

<tr>

<td style="padding:12px;"><b>Status</b></td>

<td
style="
padding:12px;
font-weight:bold;
color:${corStatus};
">

${status}

</td>

</tr>

<tr style="background:#F4F6F9;">

<td style="padding:12px;"><b>Usuário</b></td>

<td style="padding:12px;">

${usuario}

</td>

</tr>

<tr>

<td style="padding:12px;"><b>Data / Hora</b></td>

<td style="padding:12px;">

${dataHora}

</td>

</tr>

${
observacao
?
`

<tr style="background:#F4F6F9;">

<td style="padding:12px;"><b>Observação</b></td>

<td style="padding:12px;">

${observacao}

</td>

</tr>

`
:
""
}

</table>

${alerta}

<br>

<table
width="100%"
style="
margin-top:15px;
border-collapse:collapse;
">

<tr>

<td
style="
background:#F8F9FA;
padding:18px;
border-left:4px solid #003B70;
font-size:13px;
color:#555;
">

<b>Informações Importantes</b>

<ul style="margin-top:10px;">

<li>
Esta mensagem foi enviada automaticamente pelo Sistema de Controle de Estoque.
</li>

<li>
Não responda este e-mail.
</li>

<li>
Em caso de divergência, entre em contato com a Engenharia de Manutenção.
</li>

</ul>

</td>

</tr>

</table>

</td>

</tr>

<tr>

<td
style="
background:#003B70;
padding:18px;
text-align:center;
color:white;
font-size:12px;
">

<b>Controle de Estoque</b><br>

Engenharia de Manutenção • Metrô BH

<br><br>

Mensagem automática gerada em
${dataHora}

</td>

</tr>

</table>

</body>

</html>
`;

      MailApp.sendEmail({

        to: CONFIG.EMAIL_ADMIN,

        subject: assunto,

        htmlBody: html,
        name: "Sistema de Controle de Estoque - Metrô BH"

      });

    } catch (e) {

      Logger.log("Erro EmailService: " + e);

    }

  }

  return {

    enviarMovimentacao

  };

})();