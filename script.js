function showCalculator(calculatorId) {
    const calculators = document.querySelectorAll('.calculator');
    calculators.forEach(calculator => {
        calculator.style.display = 'none';
    });
    document.getElementById(calculatorId).style.display = 'block';
}

function calculateQ1() {
    const bandwidth = parseFloat(document.getElementById('bandwidthQ1').value);
    const quantizerBits = parseInt(document.getElementById('quantizerBitsQ1').value);
    const compressionRate = parseFloat(document.getElementById('compressionRateQ1').value);
    const channelEncoderRate = parseFloat(document.getElementById('channelEncoderRateQ1').value);
    const interleaverBits = parseInt(document.getElementById('interleaverBitsQ1').value);

    if (isNaN(bandwidth) || isNaN(quantizerBits) || isNaN(compressionRate) || isNaN(channelEncoderRate) || isNaN(interleaverBits)) {
        alert('Please enter valid numbers for all fields.');
        return;
    }

    const samplingFrequency = 2 * bandwidth;
    const quantizationLevels = Math.pow(2, quantizerBits);
    const sourceEncoderInputRate = samplingFrequency * quantizerBits;
    const sourceEncoderOutputRate = sourceEncoderInputRate * compressionRate;
    const channelEncoderOutputRate = sourceEncoderOutputRate / channelEncoderRate;

    const equations = `
        <pre>
  Sampling Frequency = 2 * Bandwidth

                     = 2 * ${bandwidth}

                     = ${samplingFrequency} Hz
        </pre>
        <br>
        <pre>
  Quantization Levels = 2 ^ quantizerBits 

                      = ${quantizationLevels}
        </pre>
        <br>
        <pre>
  Source Encoder Input Rate = Sampling Frequency * Quantizer Bits

                            = ${samplingFrequency} * ${quantizerBits}

                            = ${sourceEncoderInputRate} bps
        </pre>
        <pre>
  Source Encoder Output Rate = Source Encoder Input Rate * Compression Rate

                             = ${sourceEncoderInputRate} * ${compressionRate}

                             = ${sourceEncoderOutputRate} bps
        </pre>
        <pre>
                                Source Encoder Output Rate
  Channel Encoder Output Rate = ---------------------------
                                  Channel Encoder Rate

                              =   ${sourceEncoderOutputRate} 
                                ---------
                                   ${channelEncoderRate}

                              = ${channelEncoderOutputRate} bps
        </pre>
    `;

    document.getElementById('equationsFormula').innerHTML = equations;

    const output = `
    <p>1- Sampling Frequency: ${samplingFrequency} Hz</p>
    <p>2- Quantization Levels: ${quantizationLevels}</p>
    <p>3- Source Encoder Output Rate: ${sourceEncoderOutputRate} bps</p>
    <p>4- Channel Encoder Output Rate: ${channelEncoderOutputRate} bps</p>
    <p>5- Interleaver Output Rate: ${channelEncoderOutputRate} bps</p>
`;
    document.getElementById('q1Output').innerHTML = output;
}


function calculateQ2() {
    const resourceBlockBandwidthInput = document.getElementById('resourceBlockBandwidthQ2').value;
    const subcarrierSpacingInput = document.getElementById('subcarrierSpacingQ2').value;      
    const ofdmSymbols = parseInt(document.getElementById('ofdmSymbolsQ2').value);
    const resourceBlockDuration = parseFloat(document.getElementById('resourceBlockDurationQ2').value);
    const modulation = parseInt(document.getElementById('modulationQ2').value);
    const parallelResourceBlocks = parseInt(document.getElementById('parallelResourceBlocksQ2').value);


    if (!Number.isInteger(parseFloat(resourceBlockBandwidthInput)) || !Number.isInteger(parseFloat(subcarrierSpacingInput))) {
        alert('Resource Block Bandwidth and Subcarrier Spacing must be integers.');
        return;
    }
    
    const resourceBlockBandwidth = parseInt(resourceBlockBandwidthInput);
    const subcarrierSpacing = parseInt(subcarrierSpacingInput);

    if (isNaN(ofdmSymbols) || ofdmSymbols <= 0 || !Number.isInteger(ofdmSymbols)) {
        alert('OFDM Symbols per Resource Block must be a positive integer.');
        return;
    }
    

    if (isNaN(modulation) || ![2, 4, 8, 16, 32, 64, 128, 256, 512, 1024].includes(modulation)) {
        alert('Modulation must be 2^number format');
        return;
    }
    

    const bitsPerResourceElement = Math.log2(modulation);
    const subcarriersPerResourceBlock = resourceBlockBandwidth / subcarrierSpacing;
    const bitsPerOFDMSymbol = bitsPerResourceElement * subcarriersPerResourceBlock;
    const bitsPerResourceBlock = bitsPerOFDMSymbol * ofdmSymbols;
    const maxTransmissionRate = (bitsPerResourceBlock * 1000) / resourceBlockDuration * parallelResourceBlocks;

    const equations = `
        <pre>
  Bits per Resource Element = log2(Modulation)

                            = log2(${modulation})

                            = ${bitsPerResourceElement} bits
        </pre>
        
        <pre>
                                                      Resource Block BW
  Bits per OFDM Symbol = Bits per Resource Element * --------------------
                                                      Subcarrier Spacing

                       = ${bitsPerResourceElement} * ${subcarriersPerResourceBlock}

                       = ${bitsPerOFDMSymbol} bits
        </pre>
        <br>
        <pre>
                                                    OFDM Symbols
  Bits per Resource Block = Bits per OFDM Symbol * --------------
                                                   Resource Block

                          = ${bitsPerOFDMSymbol} * ${ofdmSymbols}

                          = ${bitsPerResourceBlock} bits/RB
        </pre>
        <br>
        <pre>
                                 (Bits per Resource Block * 1000) 
  Max Transmission Rate = --------------------------------------------------
                                    Parallel Resource Blocks

                            (${bitsPerResourceBlock} * ${parallelResourceBlocks}) 
                        = -------------
                               ${resourceBlockDuration}

                        = ${maxTransmissionRate} bps
        </pre>
    `;

    document.getElementById('equationsFormula').innerHTML = equations;

    const output = `
        <p>1- Bits per Resource Element: ${bitsPerResourceElement} bits</p>
        <p>2- Bits per OFDM Symbol: ${bitsPerOFDMSymbol} bits</p>
        <p>3- Bits per Resource Block: ${bitsPerResourceBlock} bits/RB</p>
        <p>4- Max Transmission Rate: ${maxTransmissionRate} bps</p>
    `;
    document.getElementById('q2Output').innerHTML = output;
}


function calculateQ3() {
    const pathLoss = parseFloat(document.getElementById('pathLossQ3').value);
    const frequency = parseFloat(document.getElementById('frequencyQ3').value);
    const transmitAntennaGain = parseFloat(document.getElementById('transmitAntennaGainQ3').value);
    const receiveAntennaGain = parseFloat(document.getElementById('receiveAntennaGainQ3').value);
    const dataRate = parseFloat(document.getElementById('dataRateQ3').value);
    const antennaFeedLoss = parseFloat(document.getElementById('antennaFeedLossQ3').value);
    const otherLosses = parseFloat(document.getElementById('otherLossesQ3').value);
    const fadeMargin = parseFloat(document.getElementById('fadeMarginQ3').value);
    const receiverAmplifierGain = parseFloat(document.getElementById('receiverAmplifierGainQ3').value);
    const noiseFigure = parseFloat(document.getElementById('noiseFigureQ3').value);
    const noiseTemperature = parseFloat(document.getElementById('noiseTemperatureQ3').value);
    const linkMargin = parseFloat(document.getElementById('linkMarginQ3').value);
    const bitErrorRate = parseFloat(document.getElementById('bitErrorRateQ3').value);

    const modulationType = document.getElementById('modulationTypeQ3').value;

    if (isNaN(pathLoss) || isNaN(frequency) || isNaN(transmitAntennaGain) || isNaN(receiveAntennaGain) || isNaN(dataRate) || isNaN(antennaFeedLoss) || isNaN(otherLosses) || isNaN(fadeMargin) || isNaN(receiverAmplifierGain) || isNaN(noiseFigure) || isNaN(noiseTemperature) || isNaN(linkMargin) || isNaN(bitErrorRate)) {
        alert('Please enter valid numbers for all fields.');
        return;
    }

    // Eb/N0 values based on modulation type and BER
    const Eb_N0_values = {
        'BPSK/QPSK': {
            '0.00000001': 12,
            '0.000001': 10,
            '0.0001': 8,
            '0.01': 4,
            '0.1': 0
        },
        '8-PSK': {
            '0.00000001': 15,
            '0.000001': 14,
            '0.0001': 12,
            '0.01': 8,
            '0.1': 0
        },
        '16-PSK': {
            '0.00000001': 19,
            '0.000001': 18,
            '0.0001': 16,
            '0.01': 12,
            '0.1': 0
        }
    };

    let Eb_N0 = Eb_N0_values[modulationType][bitErrorRate];
    if (Eb_N0 === undefined) {
        alert('Invalid BER value selected.');
        return;
    }

    // Calculate M and Pr
    const k = 1.38 * Math.pow(10, -23);
    const T = noiseTemperature;
    const Nf_total = noiseFigure;
    const R = dataRate * 1000; // Convert kbps to bps
    const M = linkMargin;

    const k_dB = (10 * Math.log10(k)).toFixed(1);
    const T_dB = (10 * Math.log10(T)).toFixed(1);
    const Nf_total_dB = Nf_total.toFixed(2); // Assuming noise figure is already in dB
    const R_dB = (10 * Math.log10(R)).toFixed(1);
    const Eb_N0_dB = Eb_N0.toFixed(2); // Assuming Eb/N0 is already in dB

    const Pr = M + parseFloat(k_dB) + parseFloat(T_dB) + parseFloat(Nf_total_dB) + parseFloat(R_dB) + parseFloat(Eb_N0_dB);
    const Pt_dB = Pr + pathLoss + antennaFeedLoss + otherLosses + fadeMargin - transmitAntennaGain - receiveAntennaGain - receiverAmplifierGain;

    // Convert Pt from dB to watts
    const Pt_watts = Math.pow(10, Pt_dB / 10);

    // Display equations and total transmit power
    const equations = `
        <div style="display: flex; justify-content: center;">
            <img src="curve.png" alt="Rural Environment" style="width: 100%; max-width: 350px; margin-top: 20px;">
        </div>
        <pre>
                            Pr
        M  = ------------------------------------    (k = 1.38*10^-23 J/K)
                k * T * Nf-total * R * (Eb / N0)

                                        Pr
        ${M} dB  = -----------------------------------------------------
               ${k} * ${T} * ${Nf_total} dB * ${R / 1000} kbps * ${Eb_N0} dB (from curve)

                = M dB + k dB + T dB + Nf-total dB + R dB + (Eb / N0) dB

                = ${M} dB + ${k_dB} dB + ${T_dB} dB + ${Nf_total_dB} dB + ${R_dB} dB + ${Eb_N0_dB} dB

                = ${Pr} dB

        
                Pt * Gt * Gr * At * Ar
        Pr = --------------------------
                Lp * Lf * Lo * Lf-margin

        Pt = Pr dB + Lp dB + Lf dB + Lo dB + Lf-margin dB 
             - Gt dB - Gr dB - At dB - Ar dB

        Pt = ${Pr} dB + ${pathLoss} dB + ${antennaFeedLoss} dB + ${otherLosses} dB + ${fadeMargin} dB 
             - ${transmitAntennaGain} dB - ${receiveAntennaGain} dB - 0 dB - ${receiverAmplifierGain} dB

        Pt = ${Pt_dB} dB

        Pt = ${Pt_watts.toFixed(10)} watts
        </pre>
    `;
    document.getElementById('equationsFormula').innerHTML = equations;

    const output = `
        <p>Total Transmit Power: ${Pt_watts.toFixed(10)} watts</p>
    `;
    document.getElementById('q3Output').innerHTML = output;

    // Scroll to the equationsFormula div
    document.getElementById('equationsFormula').scrollIntoView({ behavior: 'smooth' });
}



function calculateQ4() {
    const bandwidth = parseFloat(document.getElementById('bandwidthQ4').value);
    const maxPropagationTime = parseFloat(document.getElementById('maxPropagationTimeQ4').value);
    const frameSize = parseFloat(document.getElementById('frameSizeQ4').value);
    const frameRate = parseFloat(document.getElementById('frameRateQ4').value);

    if (isNaN(bandwidth) || isNaN(maxPropagationTime) || isNaN(frameSize) || isNaN(frameRate)) {
        alert('Please enter valid numbers for all fields.');
        return;
    }

    // Calculation logic
    const T_frame = (frameSize * 1000) / (bandwidth * 1000000); // frameSize in bits, bandwidth in Mbps
    const T_frame_msec = T_frame * 1000; // Convert to microseconds


    const G = frameRate * T_frame_msec;
    const alpha = (maxPropagationTime / T_frame_msec) / 1000;
    const α = maxPropagationTime / T_frame_msec;
    
    // Calculating Sth
    const T = T_frame_msec;
    const new_T = T_frame_msec/1000;
    const numerator = G * Math.exp(-2 * alpha * new_T);
    const denominator = G * (1 + (2 * alpha)) + Math.exp(-alpha * G);
    const Sth = numerator / denominator;

    // Equations
const equations = `
            <div style="display: flex; justify-content: center;">
                <img src="throu.png" alt="Rural Environment" style="width: 100%; max-width: 400px; margin-top: 20px;">
            </div>
            <pre>
                    Frame Size 
        T_frame = -------------
                    Bandwidth

                    ${frameSize} * 10^3 
                = -------------  = ${T_frame.toFixed(6)} sec  = ${T_frame_msec.toFixed(2)} msec
                    ${bandwidth} * 10^6

            </pre>
            <pre>
                    G * e^(2αT)
        Sth = -----------------------
                G * (1+2α) + e^(-αG)
        
        <br>   
        First, we calculate the value of G:

        G = frameRate * T_frame_msec = ${frameRate} * ${T_frame_msec.toFixed(2)}

        = ${G.toFixed(2)}
        <br>

        Now we calculate the value of α: 
            𝜏        ${maxPropagationTime} * 10^-6
        α = ----- = ------------------ = ${α} * 10^-3
            T        ${T_frame_msec} * 10^-3
            </pre>
            <br>
            <pre>
        Substituting the values into Sth:

                    ${G.toFixed(2)} * e^(-2 * ${(alpha.toFixed(2))} * ${T_frame_msec})
        Sth = -----------------------------------------
            ${G.toFixed(2)} * (1 + 2 * ${alpha.toFixed(2)}) + e^(-${alpha.toFixed(2)} * ${G.toFixed(2)})

        
        
        Sth = ${Sth.toFixed(6)} = ${(Sth*100).toFixed(6)}%
            </pre>
        `;

    document.getElementById('equationsFormula').innerHTML = equations;

    // Output
    const output = `
        <p>1- T_frame = ${T_frame_usec.toFixed(2)} μsec</p>
        <p>2- Max Signal Propagation Time = ${maxPropagationTime.toFixed(2)} μsec</p>
        <p>3- Frame Rate = ${frameRate.toFixed(2)} Kfps</p>
        <p>4- G = ${G.toFixed(2)}</p>
        <p>5- α = ${alpha.toFixed(6)}</p>
        <p>6- Sth = ${Sth.toFixed(4)}</p>
    `;
    document.getElementById('q4Output').innerHTML = output;

    // Scroll to the equationsFormula div
    document.getElementById('equationsFormula').scrollIntoView({ behavior: 'smooth' });
}


// Initial display of the first calculator
showCalculator('q1Calculator');
