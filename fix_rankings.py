import sys
import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

pattern = re.compile(r'<!-- PÁG 7: RANKINGS -->\s*<div class="page" id="p7">.*?<!-- PÁG 8: CONTACTO -->', re.DOTALL)

new_p7 = """<!-- PÁG 7: RANKINGS -->
            <div class="page" id="p7" style="flex-direction: row;">
                <!-- LEFT: Forbes + Media (granate oscuro) -->
                <div class="p7-rankings-left"
                    style="width: 48%; background: var(--g2); padding: 48px 40px; display: flex; flex-direction: column; justify-content: space-between; overflow: hidden; position: relative;">

                    <!-- Header -->
                    <div class="ani" style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px;">
                        <div>
                            <div style="color: #fff; font-size: 24px; font-weight: 900; line-height: 1; letter-spacing: 2px;">&gt;&gt;&gt;</div>
                            <div style="color: #fff; font-size: 38px; font-family: var(--font-head); font-weight: 900; line-height: 1; margin-top: 8px;">Rankings</div>
                        </div>
                        <div style="text-align: left; max-width: 50%; padding-top: 12px;">
                            <div style="color: #fff; font-size: 16px; font-weight: 700; line-height: 1.2;">ENAE se encuentra entre<br>las mejores Escuelas de<br>Negocios</div>
                        </div>
                    </div>

                    <!-- Forbes & Rankings 2025 Header -->
                    <div class="ani" style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: -10px;">
                        <div style="width: 50%; padding-right: 20px;">
                            <div style="border-top: 1px solid rgba(255,255,255,0.3); border-bottom: 1px solid rgba(255,255,255,0.3); padding: 10px 0; text-align: center;">
                                <div style="font-family: var(--font-serif); font-size: 32px; color: #fff; font-weight: 700; line-height: 1;">Forbes</div>
                                <div style="font-size: 9px; color: #fff; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 6px;">Mejores Escuelas de Negocio 2025</div>
                            </div>
                        </div>
                        <div style="width: 50%; text-align: center;">
                            <div style="color: rgba(255,255,255,0.4); font-size: 20px; font-weight: 700; font-family: var(--font-head);">Ranking 2025</div>
                        </div>
                    </div>

                    <!-- Forbes grid -->
                    <div class="ani" style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; text-align: center;">
                        <!-- Master in International Trade -->
                        <div style="position: relative; padding-top: 20px;">
                            <div style="position: absolute; top: 0; left: 50%; transform: translateX(-50%); font-family: var(--font-head); font-size: 72px; font-weight: 900; color: rgba(255, 255, 255, 0.15); line-height: 1; z-index: 1;">#06</div>
                            <div style="position: relative; z-index: 2; margin-top: 36px; padding: 0 10px;">
                                <div style="color: #fff; font-size: 11px; font-weight: 800; line-height: 1.3;">Master in International Trade</div>
                                <div style="color: #fff; font-size: 9px; font-style: italic; margin-top: 4px;">Categoría: Recién licenciados y<br>jóvenes profesionales</div>
                            </div>
                        </div>
                        <!-- Global Executive MBA -->
                        <div style="position: relative; padding-top: 20px;">
                            <div style="position: absolute; top: 0; left: 50%; transform: translateX(-50%); font-family: var(--font-head); font-size: 72px; font-weight: 900; color: rgba(255, 255, 255, 0.15); line-height: 1; z-index: 1;">#07</div>
                            <div style="position: relative; z-index: 2; margin-top: 36px; padding: 0 10px;">
                                <div style="color: #fff; font-size: 11px; font-weight: 800; line-height: 1.3;">Global Executive MBA</div>
                                <div style="color: #fff; font-size: 9px; font-style: italic; margin-top: 4px;">Categoría: Programas Ejecutivos</div>
                            </div>
                        </div>
                        <!-- International MBA -->
                        <div style="position: relative; padding-top: 20px;">
                            <div style="position: absolute; top: 0; left: 50%; transform: translateX(-50%); font-family: var(--font-head); font-size: 72px; font-weight: 900; color: rgba(255, 255, 255, 0.15); line-height: 1; z-index: 1;">#12</div>
                            <div style="position: relative; z-index: 2; margin-top: 36px; padding: 0 10px;">
                                <div style="color: #fff; font-size: 11px; font-weight: 800; line-height: 1.3;">International MBA</div>
                                <div style="color: #fff; font-size: 9px; font-style: italic; margin-top: 4px;">Categoría: MBA</div>
                            </div>
                        </div>
                        <!-- Magistrae -->
                        <div style="position: relative; padding-top: 20px;">
                            <div style="position: absolute; top: 0; left: 50%; transform: translateX(-50%); font-family: var(--font-head); font-size: 72px; font-weight: 900; color: rgba(255, 255, 255, 0.15); line-height: 1; z-index: 1;">#04</div>
                            <div style="position: relative; z-index: 2; margin-top: 36px; padding: 0 10px;">
                                <div style="color: #fff; font-size: 11px; font-weight: 800; line-height: 1.3;">Magistrae</div>
                                <div style="color: #fff; font-size: 9px; font-style: italic; margin-top: 4px;">Categoría: Alta Dirección</div>
                            </div>
                        </div>
                    </div>

                    <!-- Financial Magazine -->
                    <div class="ani" style="display: flex; align-items: center; gap: 20px; margin-bottom: 24px;">
                        <div style="background: #fff; padding: 10px 16px; border-radius: 6px; width: 160px; display: flex; justify-content: center; align-items: center;">
                            <img src="src/Rankings/FinancialMagazine.png" alt="Financial Magazine" style="max-width: 100%; height: auto;">
                        </div>
                        <div style="position: relative; flex-grow: 1;">
                            <div style="position: absolute; left: 0; top: 50%; transform: translateY(-50%); font-family: var(--font-head); font-size: 64px; font-weight: 900; color: rgba(255, 255, 255, 0.15); line-height: 1; z-index: 1;">#06</div>
                            <div style="position: relative; z-index: 2; padding-left: 20px;">
                                <div style="color: #fff; font-size: 11px; font-weight: 800; line-height: 1.2;">Mejores<br>Escuelas de Negocios<br>en España</div>
                            </div>
                        </div>
                    </div>

                    <!-- El Mundo -->
                    <div class="ani" style="display: flex; align-items: flex-start; gap: 24px;">
                        <!-- El Mundo Left -->
                        <div style="width: 45%;">
                            <img src="src/Rankings/El_Mundo_logo.svg.png" alt="El Mundo" style="height: 20px; width: auto; filter: brightness(0) invert(1); margin-bottom: 16px;">
                            <div style="display: flex; align-items: center; gap: 10px;">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                <div style="color: #fff; font-size: 12px; font-weight: 800; line-height: 1.2;">Mejores MBA<br>de España</div>
                            </div>
                        </div>
                        <!-- El Mundo Right -->
                        <div style="width: 55%;">
                            <div style="color: rgba(255,255,255,0.6); font-size: 11px; margin-bottom: 8px;">Mejores másters Online</div>
                            <div style="display: flex; gap: 20px;">
                                <div style="position: relative;">
                                    <div style="font-family: var(--font-head); font-size: 42px; font-weight: 900; color: rgba(255, 255, 255, 0.15); line-height: 1; margin-bottom: -15px;">#02</div>
                                    <div style="position: relative; z-index: 2; color: #fff; font-size: 10px; font-weight: 800; line-height: 1.2; padding-left: 4px;">International<br>Trade</div>
                                </div>
                                <div style="position: relative;">
                                    <div style="font-family: var(--font-head); font-size: 42px; font-weight: 900; color: rgba(255, 255, 255, 0.15); line-height: 1; margin-bottom: -15px;">#04</div>
                                    <div style="position: relative; z-index: 2; color: #fff; font-size: 10px; font-weight: 800; line-height: 1.2; padding-left: 4px;">Máster universitario en<br>Dirección de<br>Agronegocios</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- RIGHT: QS Stars & Medals (granate claro) -->
                <div class="p7-rankings-right"
                    style="width: 52%; background: var(--g); padding: 48px 40px; display: flex; flex-direction: column; justify-content: space-between; overflow: hidden; position: relative;">
                    
                    <div style="position: absolute; right: -40px; top: 10%; font-family: var(--font-head); font-size: 400px; font-weight: 900; color: rgba(255, 255, 255, 0.04); line-height: 1; pointer-events: none; user-select: none;">QS</div>

                    <!-- Top Row: QS Rated Excellent + 4 Star Badges -->
                    <div class="ani" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 30px; z-index: 1;">
                        <img src="src/Rankings/sello escuelas y universidades_b.png" alt="QS Rated Excellent" style="height: 110px; width: auto;">
                        <div style="display: flex; gap: 12px;">
                            <img src="src/Rankings/e32d12cd-861d-4634-8b5d-ca1fbae0e4db.png" alt="QS Stars Enseñanza" style="height: 60px; width: auto;">
                            <img src="src/Rankings/6db43692-2cf3-407f-b674-75311166e7cf.png" alt="QS Stars Empleo" style="height: 60px; width: auto;">
                            <img src="src/Rankings/2950d6d7-9af8-4583-9c77-d8240f953611.png" alt="QS Stars Online" style="height: 60px; width: auto;">
                            <img src="src/Rankings/b3b7e495-1f79-4615-97b7-688792bd45fd.png" alt="QS Stars Inclusión" style="height: 60px; width: auto;">
                        </div>
                    </div>

                    <!-- Grid of 8 program specific medals -->
                    <div class="ani" style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px 20px; z-index: 1;">
                        <!-- Medalla 1 -->
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <img src="src/Rankings/99f03286-f60a-47a4-8774-bccf8abcbbdb.png" alt="QS badge" style="height: 64px; width: auto;">
                            <div style="position: relative;">
                                <div style="position: absolute; left: -10px; top: 50%; transform: translateY(-50%); font-family: var(--font-head); font-size: 54px; font-weight: 900; color: rgba(255, 255, 255, 0.15); line-height: 1; z-index: 1;">#10</div>
                                <div style="position: relative; z-index: 2; padding-left: 14px;">
                                    <div style="color: rgba(255,255,255,0.7); font-size: 9px; line-height: 1;">Máster en</div>
                                    <div style="color: #fff; font-size: 11px; font-weight: 800; line-height: 1.1;">IA y Data Science</div>
                                    <div style="color: rgba(255,255,255,0.5); font-size: 10px; margin-top: 2px;">España</div>
                                </div>
                            </div>
                        </div>

                        <!-- Medalla 2 -->
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <img src="src/Rankings/e28e8b09-fbda-47c6-af43-34509a6d3dd8.png" alt="QS badge" style="height: 64px; width: auto;">
                            <div style="position: relative;">
                                <div style="position: absolute; left: -10px; top: 50%; transform: translateY(-50%); font-family: var(--font-head); font-size: 54px; font-weight: 900; color: rgba(255, 255, 255, 0.15); line-height: 1; z-index: 1;">#06</div>
                                <div style="position: relative; z-index: 2; padding-left: 14px;">
                                    <div style="color: rgba(255,255,255,0.7); font-size: 9px; line-height: 1;">Máster universitario en</div>
                                    <div style="color: #fff; font-size: 11px; font-weight: 800; line-height: 1.1;">Logística y Dirección<br>de Operaciones</div>
                                    <div style="color: rgba(255,255,255,0.5); font-size: 10px; margin-top: 2px;">España</div>
                                </div>
                            </div>
                        </div>

                        <!-- Medalla 3 -->
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <img src="src/Rankings/QS Executive MBA Rankings - Europe - 2026 - Badge.png" alt="QS badge" style="height: 64px; width: auto;">
                            <div style="position: relative;">
                                <div style="position: absolute; left: -10px; top: 50%; transform: translateY(-50%); font-family: var(--font-head); font-size: 54px; font-weight: 900; color: rgba(255, 255, 255, 0.15); line-height: 1; z-index: 1;">#06</div>
                                <div style="position: relative; z-index: 2; padding-left: 14px;">
                                    <div style="color: #fff; font-size: 11px; font-weight: 800; line-height: 1.1;">Global<br>Executive MBA</div>
                                    <div style="color: rgba(255,255,255,0.5); font-size: 10px; margin-top: 2px;">España</div>
                                </div>
                            </div>
                        </div>

                        <!-- Medalla 4 -->
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <img src="src/Rankings/18c6ddab-e93d-4504-b5ad-ed2593881ba5.png" alt="QS badge" style="height: 64px; width: auto;">
                            <div style="position: relative;">
                                <div style="position: absolute; left: -10px; top: 50%; transform: translateY(-50%); font-family: var(--font-head); font-size: 54px; font-weight: 900; color: rgba(255, 255, 255, 0.15); line-height: 1; z-index: 1;">#09</div>
                                <div style="position: relative; z-index: 2; padding-left: 14px;">
                                    <div style="color: rgba(255,255,255,0.7); font-size: 9px; line-height: 1;">Máster internacional en</div>
                                    <div style="color: #fff; font-size: 11px; font-weight: 800; line-height: 1.1;">Marketing Digital<br><span style="font-size:8px; font-weight:normal;">con Mención en Inteligencia Artificial</span></div>
                                    <div style="color: rgba(255,255,255,0.5); font-size: 10px; margin-top: 2px;">España</div>
                                </div>
                            </div>
                        </div>

                        <!-- Medalla 5 -->
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <img src="src/Rankings/1c465398-80d3-4b18-8bf8-deccb5a7d7af.png" alt="QS badge" style="height: 64px; width: auto;">
                            <div style="position: relative;">
                                <div style="position: absolute; left: -10px; top: 50%; transform: translateY(-50%); font-family: var(--font-head); font-size: 54px; font-weight: 900; color: rgba(255, 255, 255, 0.15); line-height: 1; z-index: 1;">#08</div>
                                <div style="position: relative; z-index: 2; padding-left: 14px;">
                                    <div style="color: rgba(255,255,255,0.7); font-size: 9px; line-height: 1;">Máster en</div>
                                    <div style="color: #fff; font-size: 11px; font-weight: 800; line-height: 1.1;">Finanzas, Fintech<br>y Control Estratégico</div>
                                    <div style="color: rgba(255,255,255,0.5); font-size: 10px; margin-top: 2px;">España</div>
                                </div>
                            </div>
                        </div>

                        <!-- Medalla 6 -->
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <img src="src/Rankings/qs_international_trade.png" alt="QS badge" style="height: 64px; width: auto;">
                            <div style="position: relative;">
                                <div style="position: absolute; left: -10px; top: 50%; transform: translateY(-50%); font-family: var(--font-head); font-size: 54px; font-weight: 900; color: rgba(255, 255, 255, 0.15); line-height: 1; z-index: 1;">#03</div>
                                <div style="position: relative; z-index: 2; padding-left: 14px;">
                                    <div style="color: #fff; font-size: 11px; font-weight: 800; line-height: 1.1;">International<br>Trade</div>
                                    <div style="color: rgba(255,255,255,0.5); font-size: 10px; margin-top: 2px;">España</div>
                                </div>
                            </div>
                        </div>

                        <!-- Medalla 7 -->
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <img src="src/Rankings/76e149bf-d0f1-4b5e-8cf5-9826206a5f62.png" alt="QS badge" style="height: 64px; width: auto;">
                            <div style="position: relative;">
                                <div style="position: absolute; left: -10px; top: 50%; transform: translateY(-50%); font-family: var(--font-head); font-size: 54px; font-weight: 900; color: rgba(255, 255, 255, 0.15); line-height: 1; z-index: 1;">#13</div>
                                <div style="position: relative; z-index: 2; padding-left: 14px;">
                                    <div style="color: rgba(255,255,255,0.7); font-size: 9px; line-height: 1;">Máster universitario en</div>
                                    <div style="color: #fff; font-size: 11px; font-weight: 800; line-height: 1.1;">Gestión de Riesgos<br>en las Organizaciones</div>
                                    <div style="color: rgba(255,255,255,0.5); font-size: 10px; margin-top: 2px;">España</div>
                                </div>
                            </div>
                        </div>

                        <!-- Medalla 8 -->
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <img src="src/Rankings/68ad4500-612d-41e7-b2c3-f4266989e13f.png" alt="QS badge" style="height: 64px; width: auto;">
                            <div style="position: relative;">
                                <div style="position: absolute; left: -10px; top: 50%; transform: translateY(-50%); font-family: var(--font-head); font-size: 54px; font-weight: 900; color: rgba(255, 255, 255, 0.15); line-height: 1; z-index: 1;">#09</div>
                                <div style="position: relative; z-index: 2; padding-left: 14px;">
                                    <div style="color: #fff; font-size: 11px; font-weight: 800; line-height: 1.1;">International<br>MBA</div>
                                    <div style="color: rgba(255,255,255,0.5); font-size: 10px; margin-top: 2px;">España</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
<!-- PÁG 8: CONTACTO -->
"""

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(re.sub(pattern, new_p7, content))

print("Successfully replaced Rankings block.")
