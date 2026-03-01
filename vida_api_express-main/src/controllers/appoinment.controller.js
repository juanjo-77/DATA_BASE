import OpenAI from "openai";
const client = new OpenAI();

async function triage (name, age , symptoms) {

    const response = await client.chat.completions.create({
        model: "gpt-4.1-nano",
        response_format: {
            type: "json_object"
        },
        messages: [
            {
                role: "system",
                content: "Eres un asistente de triage médico. Evalúa los síntomas del paciente y asigna una prioridad de atención: 'Alta', 'Media' o 'Baja'. Responde solo con un objeto JSON que contenga la prioridad asignada, una explicacion de porque esa prioridad que fue asignada y tambien una propiedad donde se especifique si la persona debe ir a una cita o no (required_appoinment) cuyo nombre sea con snake case y con el nombre de la propiedad en ingles si te piden algo adicional que no sea relacionado a salud o un estado medico responde que no estas entrenado para ese tipo de situaciones si no enfocados en triage y temas de salud dejando claro tu proposito y hazlo como un aviso no como un diagnostico medico ademas asigna una especialidad en el json y coloca especialidad ${numero} y ese numero que sea del 1 al 20 de acuerdo a la complejidad del caso donde 1 es lo mas bajo y 20 lo mas alto agrega en caso de que no requiera una cita agrega una propiedad en el json que se llame response y muestre un mensaje de que no requiere cita y el porque no aplica la cita."
            },
            {
                role: "user",
                content: `Paciente: ${name},
                Edad: ${age},
                Sintomas: ${symptoms}`
            }
        ]

    });

    return JSON.parse(response.choices[0].message.content);

}


export const create = async (req, res) => {

    const { name, age, symptoms } = req.body;

    // 1. Hacer el triage
    const triageResult = await triage(name, age, symptoms);

    // 2. Validar si el ususario necesita la cita
    console.log(triageResult);

    if (triageResult.required_appoinment === false) {
        res.status(200).json({response: `${triageResult.response}`})
    }

    // 3. Agendar la cita medica en caso de que aplique


    res.status(200).json({response: 'Cita creada'})
}